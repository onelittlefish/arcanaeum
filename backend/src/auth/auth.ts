import config = require("../config/config.json")
import { Request, RequestHandler, Response, NextFunction } from "express"
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth2"
import * as passport from "passport"
import { User } from "../models/User"

const baseUrl = config.httpServer.baseUrl

export class AuthManager {
  constructor() {
    this.setUpPassport()
  }

  private setUpPassport() {
    passport.use(new GoogleStrategy({
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: baseUrl + "/auth/google/callback",
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true
      },
      function(req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        console.log("authenticated")
        const email = profile.email
        User.findOne({ email: email }, function(err, user) {
          done(err, user)
        })
      }
    ))

    passport.serializeUser(function(user, done) {
      done(null, user)
    })
    
    passport.deserializeUser(function(user, done) {
      done(null, user)
    })
  }

  private auth(req: Express.Request, notAuthenticatedCallback: () => void, notAuthorizedCallback: () => void, nextCallback: () => void) {
    const isAuthenticated = req.isAuthenticated()
    const isAuthorized = isAuthenticated && req.user
  
    if (!isAuthenticated) {
      console.log("not authenticated")
      notAuthorizedCallback()
    } else if (!isAuthorized) {
      console.log("not authorized")
      notAuthorizedCallback()
    } else {
      nextCallback()
    }
  }
  
  apiAuth(req: Express.Request, res: Response, next: NextFunction) {
    this.auth(req, function() {
      res.sendStatus(401)
    }, function() {
      res.sendStatus(403)
    }, next)
  }
  
  webAuth(req: Express.Request, res: Response, next: NextFunction) {
    this.auth(req, function() {
      res.redirect("/login")
    }, function() {
      req.logout()
      res.redirect("/login")
    }, next)
  }
}
