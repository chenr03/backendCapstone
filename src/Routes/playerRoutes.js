let express = require('express');

let Routes = express.Router();

let controller = require("../Controller/players");

let { checkJWT } = require('../middleware/authorization')

// These routes are for my Players Table
Routes.get("/players", controller.getAllPlayers)
Routes.get("/player/:playerId", controller.getSinglePlayer);
Routes.post('/player', checkJWT, controller.createPlayer);
Routes.delete('/player/:playerId', checkJWT, controller.deletePlayer);
Routes.put('/player/:playerId', checkJWT, controller.updatePlayer);

module.exports = Routes;



