const { UserModel } = require("../../models/User.js")
const { Op } = require("sequelize")

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
    UpdateUserController: updateUser
}