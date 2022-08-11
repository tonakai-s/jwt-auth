require("dotenv").config({path: `${__dirname}/../../.env`})
const express = require("express");
const crypto = require("crypto")
const { UserModel } = require("../models/User.js")
const { Op } = require("sequelize")
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

router.post("/login", async (request, response) => {
    try{
        const requestUsername = request.body.username
        const hashedPassword = crypto.createHash("sha256").update(request.body.password).digest("hex")
        if(!requestUsername || !request.body.password) {
            return response.json({
                status: "error",
                response: "Please enter all the details!"
            }).end()
        }

        const userExist = await UserModel.findOne({
            where: {
                username: requestUsername
            }
        })
        if(!userExist){
            return response.json({
                status: "error",
                response: "Username or password are invalid!"
            }).end()
        }

        const isPasswordMatched = await UserModel.findOne({
            where: {
                [Op.and]: [{
                    username: requestUsername,
                    password: hashedPassword
                }]
            }
        })
        if(!isPasswordMatched){
            return response.json({
                status: "error",
                response: "Username or password are invalid!"
            }).end()
        }

        const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        })

        console.log(`Generated token: ${token}`)

        return response.cookie({ "token": token }).json({
            status: "success",
            redirect: "/home"
        }).end()
    } catch(error){
        return response.json({
            status: "error",
            reponse: error
        })
    }
})

module.exports = {
    loginRoutes: router
}