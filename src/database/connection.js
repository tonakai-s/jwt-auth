require("dotenv").config({path: `${__dirname}/../../.env`});
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWD, {
    host: process.env.DB_HOST,
    dialect: "postgres"
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