const db = require("../database/connection.js");

const User = db.sequelize.define("users", {
    username: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    is_admin: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = {
    UserModel: User
}