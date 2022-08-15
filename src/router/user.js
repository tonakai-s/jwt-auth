const express = require("express")

const { isAdmin } = require("../middlewares/admin.js")
const { isAuthenticated } = require("../middlewares/auth.js")

const { SearchUserController } = require("../controllers/User/searchUser.js")
const { ViewUserController } = require("../controllers/User/viewUser.js")
const { RegisterUserController } = require("../controllers/User/registerUser.js")
const { DeleteUserController } = require("../controllers/User/deleteUser.js")
const { UpdateUserController } = require("../controllers/User/updateUser.js")

const router = express.Router()

router.get("/search-user", isAuthenticated, SearchUserController)
router.get("/view-user/:username/:id", isAuthenticated, ViewUserController)
router.post("/register-user", isAuthenticated, isAdmin, RegisterUserController)
router.delete("/delete-user/:id", isAuthenticated, isAdmin, DeleteUserController)
router.put("/update-user/:username/:id", isAuthenticated, isAdmin, UpdateUserController)

module.exports = {
    userRoutes: router
}