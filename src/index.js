const express  = require("express");
const { homeRouter } = require("./router/home.js")
const { userRoutes } = require("./router/user.js")
const { loginRoutes } = require("./router/login.js")
const cookieParser = require("cookie-parser")

const APP = express();
const PORT = process.env.PORT || 3000;

APP.use(express.json())
APP.use(express.urlencoded({ extended: true }))
APP.use(cookieParser())

APP.use(homeRouter);
APP.use("/user", userRoutes);
APP.use(loginRoutes)

APP.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})