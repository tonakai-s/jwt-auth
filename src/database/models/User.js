const db = require("../connection.js");

const User = db.sequelize.define("users", {
    username: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
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
        allowNull: false,
        unique: true
    },
    is_admin: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = {
    UserModel: User
}