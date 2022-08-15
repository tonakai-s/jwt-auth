const { Op } = require('sequelize')
const { UserModel } = require('../models/User.js')

const isAdmin = async (request, response, next) => {
    const {username, id} = request

    const user = await UserModel.findOne({
        attributes: [
            'username', 'id', 'is_admin'
        ],
        where: {
            [Op.and]: [{
                username: username,
                id: id
            }]
        }
    })
    
    if(user.is_admin === false){
        return next('Make login with admin account to access this route')
    }
    request.is_admin = true
    next()
}

module.exports = {
    isAdmin
}