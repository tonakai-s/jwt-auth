const { UserModel } = require("../../models/User.js")
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
}

module.exports = {
    SearchUserController: searchUser
}