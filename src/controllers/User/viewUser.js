const { UserModel } = require("../../models/User.js")
const { Op } = require("sequelize")

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
}

module.exports = {
    ViewUserController: viewUser
}