const crypto = require("crypto")
const { UserModel } = require("../models/User.js")
const { Op, QueryTypes } = require("sequelize")

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

const registerUser = async (request, response) => {
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
        return response.json({
            Status: "error",
            Response: "User ID must be a number."
        }).end()
    }

    const searchUserId = await UserModel.findAll({
        where: {
            id: UserId
        }
    })
    if(searchUserId.length === 0){
        return response.json({
            Status: "error",
            Response: "This user has not been founded to delete, maybe him not exist."
        }).end()
    }

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

const updateUser = async(request, response) => {
    try{
        const { username, id } = request.params
        const { name, password, is_admin } = request.body
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        parseInt(id)
        if(isNaN(id)){
            return response.json({
                Status: "error",
                Response: "User ID must be a number."
            }).end()
        }

        const userToUpdate = await UserModel.findOne({
            where: {
                [Op.and]: [{
                    username: username,
                    id: id
                }]
            }
        })
        if(!userToUpdate){
            return response.json({
                Status: "error",
                Response: "The selected user does't exists on the system."
            }).end()
        }

        if(!password || !name){
            return response.json({
                Status: "error",
                Response: "Name and password fields can't be empty"
            }).end()
        }

        await UserModel.update({
            name: name, password: hashedPassword, is_admin: is_admin
        }, {
            where: {
                [Op.and]: [{
                    id: id,
                    username: username
                }]
            }
        })
        response.json({
            Status: "success",
            Response: "User updated successfully"
        })
    } catch(error){
        response.json({
            Status: "error",
            Response: error
        })
    }
}

module.exports = {
    searchUser,
    viewUser,
    registerUser,
    deleteUser,
    updateUser
};