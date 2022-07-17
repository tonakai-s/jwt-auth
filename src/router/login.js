const express = require("express");

const router = express.Router();

router.post("/login", (request, response) => {
    const name = request.body.name;
    const passwd = request.body.password;

    let isUser = false;

    if(isUser) {
        const token = jwt.sign()
    }
})

module.exports = {
    loginRouter: router
}