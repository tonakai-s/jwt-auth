const crypto = require("crypto")
const { UserModel } = require("../models/User.js")
const { Op } = require("sequelize")

const searchUser = (request, response, next) => {
    const QuerySearch = request.query.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    if(QuerySearch.length === 0){
        try{
            UserModel.findAll().then(queryResult => {
                return response.json({
                    Status: "success",
                    Response: queryResult
                }).end()
            })
        } catch(error){
            return response.json({
                Status: "error",
                Response: error
            }).end()
        }
    }

    try{
        UserModel.findAll({
            where: {
                [Op.or]: [
                    { username: {
                            [Op.like]: `%${QuerySearch}%`
                        }
                    },
                    { email: {
                            [Op.like]: `%${QuerySearch}%`
                        }
                    }
                ]
            }
        }).then(queryResult => {
            return response.json({
                Status: "success",
                Response: queryResult
            }).end()
        })
    } catch(error){
        return response.json({
            Status: "error",
            Response: error
        }).end()
    }
};

const viewUser = async(request, response, next) => {
    const {username, id} = request.params;

    try{
        const userData = await UserModel.findOne({
            where: {
                [Op.and]: [{
                    username: username,
                    id: id
                }]
            }
        })
        response.json({
            Status: "success",
            Response: userData
        }).end()
    } catch(error){
        response.json({
            Status: "error",
            Response: error
        }).end()
    }
};

const newUser = async (request, response) => {
    const {username, name, password, email, is_admin} = request.body
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const findUsername = await UserModel.findAll({
        where: {
            username: username
        }
    })
    if(findUsername != 0){
        return response.json({
            Status: "error",
            Response: 'Already have a user with this username, please change another!'
        }).end()
    }

    const findUserEmail = await UserModel.findAll({
        where: {
            email: email
        }
    })
    if(findUserEmail != 0){
        return response.json({
            Status: "error",
            Response: 'This email is already in use by another user, please change another!'
        }).end()
    }
    
    try {
        const newUser = await UserModel.create({
            username: username,
            name: name,
            password: hashedPassword,
            email: email,
            is_admin: is_admin
        })
        response.json({
            Status: "success",
            Response: newUser
        }).end()
    } catch(error){
        response.json({
            Status: "error",
            Response: error
        }).end()
    }            
};

const deleteUser = async (request, response, next) => {
    const UserId = parseInt(request.params.id)

    if(isNaN(UserId)){
        response.json({
            Status: "error",
            Response: "User ID must be a number."
        }).end()
    } else {
        const searchUserId = await UserModel.findAll({
            where: {
                id: UserId
            }
        })
    
        if(searchUserId.length === 0){
            response.json({
                Status: "error",
                Response: "This user has not been founded to delete, maybe him not exist."
            })
            response.end()
        } else {
            UserModel.destroy({
                where: {
                    id: UserId
                }
            }).then(destroyResponse => {
                response.json({
                    Status: "success",
                    Response: destroyResponse
                }).end()
            }).catch(error => {
                response.json({
                    Status: "error",
                    Response: error
                }).end()
            })
        }
    }
}

module.exports = {
    searchUser,
    viewUser,
    newUser,
    deleteUser
};