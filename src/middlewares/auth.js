require("dotenv").config({path: `${__dirname}/../../.env`})
const { UserModel } = require("../models/User.js")
const jwt = require("jsonwebtoken")

const isAuthenticated = async (request, response, next) => {
    try {
        const { token } = request.cookies
        if(!token){
            return next("Please, make login to access the data.")
        }

        const verify = await jwt.verify(token, process.env.SECRET_KEY)
        console.log(JSON.stringify(verify))
        const verifiedUsername = await UserModel.findOne({
            where: {
                username: verify.username
            }
        })
        request.username = verifiedUsername.username
        next()
    } catch(error){
        switch(error.message){
            case 'invalid token':
                return next('Invalid Token Informed')
            case 'jwt malformed':
                return next('This not is a valid token')
            default:
                return next(error)
        }
    }
}

module.exports = {
    isAuthenticated
}