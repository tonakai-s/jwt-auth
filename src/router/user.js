const express = require("express");
const UserController = require("../controllers/user.js");

const router = express.Router();

router.get("/search-user", UserController.searchUser);
router.get("/view-user/:username/:id", UserController.viewUser);
router.post("/new-user", UserController.newUser);
router.delete("/delete-user/:id", UserController.deleteUser);

module.exports = {
    userRoutes: router
}