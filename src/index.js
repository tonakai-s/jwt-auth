const express  = require("express");
const { homeRouter } = require("./router/home.js")
const { userRoutes } = require("./router/user.js");

const APP = express();
const PORT = process.env.PORT || 3000;

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }))

APP.use(homeRouter);
APP.use("/user", userRoutes);

APP.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})