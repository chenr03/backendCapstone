let express = require('express');

let Routes = express.Router()

let userController = require("../Controller/user")

let { checkJWT } = require('../middleware/authorization')

// These routes are for my Users Table

Routes.get("/Users", checkJWT, userController.getAllUsers)// checkJWT
Routes.get("/User/:userId", checkJWT, userController.getSingleUser) //checkJWT
Routes.post("/User", userController.createUser)
Routes.delete("/User/:userId", checkJWT, userController.deleteUser) //checkJWT
Routes.put("/User/:userId", checkJWT, userController.updateUser) // checkJWT

module.exports = Routes;