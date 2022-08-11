const { isAuthenticated } = require("../middleware/auth.js")
const express = require("express")

const router = express.Router()

router.get("/home", isAuthenticated, async (request, response) => {
    response.json({
        status: "Success",
        response: "Hello!"
    }).end()
})

module.exports = {
    homeRouter: router
}