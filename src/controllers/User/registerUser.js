const crypto = require("crypto")
const { UserModel } = require("../../models/User.js")

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
}

module.exports = {
    RegisterUserController: registerUser
}