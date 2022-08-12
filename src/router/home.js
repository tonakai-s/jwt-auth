const { isAuthenticated } = require("../middlewares/auth.js")
const { isAdmin } = require("../middlewares/admin.js")
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