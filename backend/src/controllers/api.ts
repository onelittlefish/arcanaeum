import { Request, Response, NextFunction, Router } from "express"
import { AuthManager } from "../auth/auth"
import { User } from "../models/User"
import { Book } from "../models/Book"
import { BookService } from "../services/bookService"
import passport = require("passport");

export class ApiController {
	readonly router: Router
	
	private readonly authManager: AuthManager
	private readonly bookService: BookService

	constructor(authManager: AuthManager) {
		this.router = Router()
		this.authManager = authManager
		this.bookService = new BookService()

		this.router.get("/", function(req, res) {
			res.json({ message: "Hello" })
		})

		this.setUpUserRoutes()
		this.setUpBookRoutes()
	}

	private setUpUserRoutes() {
		this.router.route("/users")
		.all(this.authManager.apiAuth.bind(this.authManager))
		.get(function(req, res) {
			res.json(req.user)
		})
	
		this.router.route("/users/:user_id")
		.all(this.authManager.apiAuth.bind(this.authManager))
		.put(function(req, res) {
			User.findByIdAndUpdate(req.params.user_id, req.body, {new: true}, function(err, user) {
				if (err) {
					console.log("error: " + err)
					res.send(err)
				}
				res.json(user)
			})
		})
	}

	private setUpBookRoutes() {
		this.router.route("/books")
		.all(this.authManager.apiAuth.bind(this.authManager))
		.get(function(req, res) {
			Book.find(function(err, books) {
				if (err) {
					console.log("error: " + err)
					res.send(err)
				}
				res.json(books)
			})
		})
		.post(function(req, res) {
			Book.create(req.body)
			.then(function(book) {
				res.json(book)
			}).catch(function(err) {
				if (err) {
					console.log("error: " + err)
					res.send(err)
				}
			})
		})

		this.router.route("/books/:book_id")
		.all(this.authManager.apiAuth.bind(this.authManager))
		.get(function(req, res) {
			Book.findById(req.params.book_id, function(err, book) {
				if (err) {
					console.log("error: " + err)
					res.send(err)
				}
				res.json(book)
			})
		})
		.put(function(req, res) {
			Book.findByIdAndUpdate(req.params.book_id, req.body, {new: true}, function(err, book) {
				if (err) {
					console.log("error: " + err)
					res.send(err)
				}
				res.json(book)
			})
		})
		.delete(function(req, res) {
			Book.findByIdAndRemove(req.params.book_id, function(err, book) {
				if (err) {
					console.log("error: " + err)
					res.send(err)
				}
				res.json(book)
			})
		})

		this.router.use("/books.csv", this.authManager.apiAuth.bind(this.authManager), (req, res, next) => {
			this.bookService.booksAsCsv(function(err, csv) {
				if (err) {
					console.log("error: " + err)
					res.send(err)
				}

				res.type("csv")
				res.send(csv)
			})
		})
	}
}
