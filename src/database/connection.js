require("dotenv").config({path: `${__dirname}/../../.env`})
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWD, {
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT
})

sequelize.authenticate().then(() => {
    console.log("Database has been connected succesfully!");
}).catch((err) => {
    console.log(`Error on try to connect to the database: ${err}`)
});

module.exports = {
    Sequelize,
    sequelize
}