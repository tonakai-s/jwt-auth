const express = require("express");
const UserController = require("../controllers/user.js");
const { isAdmin } = require("../middlewares/admin.js");
const { isAuthenticated } = require("../middlewares/auth.js");


const router = express.Router();

router.get("/search-user", isAuthenticated, UserController.searchUser);
router.get("/view-user/:username/:id", isAuthenticated, UserController.viewUser);
router.post("/new-user", isAuthenticated, UserController.newUser);
router.delete("/delete-user/:id", isAuthenticated, isAdmin, UserController.deleteUser);

module.exports = {
    userRoutes: router
}