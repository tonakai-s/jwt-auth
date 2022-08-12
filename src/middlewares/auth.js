require("dotenv").config({path: `${__dirname}/../../.env`})
const { UserModel } = require("../models/User.js")
const jwt = require("jsonwebtoken")
const { Op } = require("sequelize")

const isAuthenticated = async (request, response, next) => {
    try {
        const { token } = request.cookies
        if(!token){
            return next("Please, make login to access the data.")
        }

        const verify = await jwt.verify(token, process.env.SECRET_KEY)

        const verifiedUser = await UserModel.findOne({
            where: {
                [Op.and]: [{
                    username: verify.username,
                    id: verify.id
                }]
            }
        })
        request.username = verifiedUser.username
        request.id = verifiedUser.id
        next()
    } catch(error){
        switch(error.message){
            case 'invalid token':
                return next('Invalid Token Informed')
            case 'jwt malformed':
                return next('Please, make login to access the data.')
            case 'jwt expired':
                return next('Token expired, please make login again.')
            default:
                return next(error)
        }
    }
}

module.exports = {
    isAuthenticated
}