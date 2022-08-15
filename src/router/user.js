const express = require("express")
const UserController = require("../controllers/user.js")
const { isAdmin } = require("../middlewares/admin.js")
const { isAuthenticated } = require("../middlewares/auth.js")


const router = express.Router()

router.get("/search-user", isAuthenticated, UserController.searchUser)
router.get("/view-user/:username/:id", isAuthenticated, UserController.viewUser)
router.post("/register-user", isAuthenticated, UserController.registerUser)
router.delete("/delete-user/:id", isAuthenticated, isAdmin, UserController.deleteUser)
router.put("/update-user/:username/:id", isAuthenticated, isAdmin, UserController.updateUser)

module.exports = {
    userRoutes: router
}