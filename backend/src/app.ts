import * as express from "express"
import * as bodyParser from "body-parser"
import * as mongoose from "mongoose"
import * as path from "path"
import * as passport from "passport"
import * as cookieParser from "cookie-parser"
import * as session from "express-session"

import config = require("./config/config.json")

import { ApiController } from "./controllers/api"
import { AuthManager } from "./auth/auth.js"

// Connect to db
mongoose.connect(config.db.url)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function (callback) {
  console.log("connected to db")
})
  
// App config
const baseUrl = config.httpServer.baseUrl
const publicPath = path.join(__dirname, "../../frontend/dist")

export const app = express()

app.disable("x-powered-by")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({ secret: config.httpServer.sessionSecret }))
app.use(passport.initialize())
app.use(passport.session())

const port = process.env.PORT || config.httpServer.port
app.set("port", port)

// Routes
const authManager = new AuthManager()
const apiController = new ApiController(authManager)

app.use("/api", apiController.router)
app.use(/\//, authManager.webAuth.bind(authManager))
app.use(/\/index.html/, authManager.webAuth.bind(authManager))
app.use("/login", function(req, res, next) {
  req.url = req.url + ".html"
  next()
})
app.use("/", express.static(publicPath))

app.get("/logout", function(req, res){
  req.logout()
  res.redirect("/login")
})

app.get("/auth/google", passport.authenticate("google", { scope: [ "email" ] }))
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function(req, res) {
  res.redirect("/")
})
