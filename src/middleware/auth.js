require("dotenv").config({path: `${__dirname}/../../.env`})
const { UserModel } = require("../models/User.js")
const jwt = require("jsonwebtoken")

const isAuthenticated = async (request, response, next) => {
    try {
        const { token } = request.cookies
        if(!token){
            return next("Please, make login to access the data")
        }

        const verify = jwt.verify(token, process.env.SECRET_KEY)
        const verifiedUsername = await UserModel.findOne({
            where: {
                username: verify.username
            }
        })
        request.username = verifiedUsername.username
        console.log(request.username)
        next()
    } catch(error){
        return next(error)
    }
}

module.exports = {
    isAuthenticated
}