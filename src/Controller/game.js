let connection = require("../Utilities/database");




//1
let getAllGames =

    function(request, response){
        console.log('GET /games');

        // lets user see what's inside the games table

        // what kind of query do we send to get all the items in the database

        let sql = "SELECT * FROM Game";

        //GETS all AllGames by selecting gameId, gameName,userId, courseId.

        connection.query(sql, function(error, rows){
            //console.log('yo')
            if(error){
                console.log('List of games query failed', error)
                response.sendStatus(500);
            } else {
                response.json(rows);
            }
        })
    };

// 2

let getSingleGame =
    //what kind of query do we need to send
    // to get a single Game from the database if we know the gameId

    function(request, response) {
        console.log("GET /game/:gameId");

        let gameId = request.params.gameId

        // if gameId is falsy (null, undefined, NAN, '')
        if(!gameId) {
            response.send(400); // this is the clients fault because they didn't choose a gameId that exists
            return;
        }

        // parameterized sql statement:

        let sql = "SELECT * FROM Game WHERE gameId = ?";

        let params = [gameId]

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to get a Single Game from the database", error);
                response.sendStatus(500); // this is our fault
            } else {
                if(rows.length > 1){
                    console.log("Returned more than 1 row for gameId", gameId);
                    response.sendStatus(500); // again would be our fault
                } else if(rows.length === 0){
                    response.json(null);
                } else {
                    response.json(rows[0]);
                }
            }
        })
    };


//3
let createGame =

    function(request, response){
        console.log("POST /game");

        // the column in the table is the contract between express and the database
        let sql = "INSERT INTO Game (gameName, courseId, userId) VALUES (?, ?, ?)";
        let params = [
            request.body.gameName,
            request.body.courseId,
            request.userInfo.userId

        ];

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to Create Game", error);
                response.sendStatus(500); // this is because it is an error on our side
            } else {
                console.log("Created Game", rows); // created disc golf game
                response.json(rows);
            }
        });

    };



// 4

let deleteGame =

    function(request, response){
        console.log("DELETE /game/:gameId");

        let gameId = request.params.gameId; // because the gameId is a path param
        let sql = "DELETE FROM Game WHERE gameId = ?";
        let params = [gameId];

        console.log("request.body", request.body);

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to Delete Game", error);
                response.sendStatus(500); // this is because there was a server error
            } else {
                console.log("Game Deleted", rows);
                response.json(rows);
            }
        });
    };


//5
let updateGame =

    function(request, response){
        console.log("PUT /game/:gameId")


    // this column in the table is the contract between express and the database
        let gameId = request.params.gameId;
        if(!gameId) {
            response.sendStatus(400); // client's fault
            return;
        }

        let sql = "UPDATE Game SET gameName = ?, userId = ?, courseId = ? WHERE gameId = ?"
        let params = [
            request.body.gameName,
            request.userInfo.userId,
            request.body.courseId,
            gameId,


        ];

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to Update Game", error)
                response.sendStatus(500); // our fault
            } else {
                console.log("Game Updated", rows);
                response.sendStatus(200);
            }
        });

    };



module.exports = {getAllGames, getSingleGame, createGame, deleteGame, updateGame};