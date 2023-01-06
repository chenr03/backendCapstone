
let express = require('express');

let Routes = express.Router()

let { checkJWT } = require('../middleware/authorization')


let gameController = require("../Controller/game")

// These routes are for my Game Table

Routes.get("/games", gameController.getAllGames)
Routes.get("/game/:gameId", gameController.getSingleGame)
Routes.post("/game", checkJWT, gameController.createGame)
Routes.delete("/game/:gameId", checkJWT, gameController.deleteGame)
Routes.put("/game/:gameId", checkJWT, gameController.updateGame)


module.exports = Routes;