const { isAuthenticated } = require("../middlewares/auth.js")
const express = require("express")

const router = express.Router()

router.get("/home", isAuthenticated, (request, response) => {
    response.json({
        status: "Success",
        response: "Welcome to the HomePage!"
    }).end()
})

module.exports = {
    homeRouter: router
}