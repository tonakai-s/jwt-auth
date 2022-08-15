const { UserModel } = require("../../models/User.js")

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

module.exports = {
    DeleteUserController: deleteUser
}