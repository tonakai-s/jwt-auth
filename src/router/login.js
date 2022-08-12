require("dotenv").config({path: `${__dirname}/../../.env`})
const express = require("express");
const crypto = require("crypto")
const { UserModel } = require("../models/User.js")
const { Op } = require("sequelize")
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (request, response) => {
    try{
        const {username, password} = request.body
        if(!username || !password) {
            return response.json({
                status: "error",
                response: "Please enter all the details!"
            }).end()
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        const userExist = await UserModel.findOne({
            where: {
                username: username
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
                    username: username,
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

        const token = jwt.sign({ username: userExist.username, id: userExist.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        })

        return response.cookie( "token", token , { httpOnly: true }).redirect("/home")
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