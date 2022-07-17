// Import JWT for API's endpoints authentication
const JWT = require("jsonwebtoken");
const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        route: '/',
        authentication: false
    })
});

module.exports = {
    homeRouter: router
};