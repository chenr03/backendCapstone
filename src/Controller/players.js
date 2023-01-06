let connection = require("../Utilities/database");
//console.log('database', database)

//- bring over database.
// let playerTable = []; //

// - taken out for the moment, as we are using the data ase and not an array

// this function takes in a request and a response object
// and returns a summary of all the player items in the response
// f the query fails for any reason, then return 500 status code.


//1
let getAllPlayers =

    function(request, response){
        console.log ("GET /players");

        // lets user see what's inside the players table

        // what kind of query do we send to get all the players in the database

        let sql = "select gameId, playerId, playerName, Hole1Score, Hole2Score, Hole3Score, Hole4Score, Hole5Score, Hole6Score, Hole7Score, Hole8Score, Hole9Score, Hole10Score, Hole11Score, Hole12Score, Hole13Score, Hole14Score, Hole15Score, Hole16Score, Hole17Score, Hole18Score from Players";


        // GETS all players by selecting playerId,
        /// firstName, lastName, gender

        connection.query(sql, function(error, rows){
            //console.log('im here' )
            if(error){
                console.log("list of players query failed", error)
                response.sendStatus(500); // 500 response back because it was our fault

            } else {
                response.json(rows); // this GETS all players in table
            }
        });


    };

//2
/**
 * This function takes in a request and response object
 * and returns a single player based on the id that is a path parameter in the request
 *
 * if the id is not a valid id, the response will be 'null'
 * otherwise, the entire player object will be returned from the response
 *
 * /players/:id
 */

let getSinglePlayer =
    // what kind of query do we need to send
    // to get a single player from the database if we know the playerId

    function(request, response){
        console.log ("GET /player/:playerId");


        // this is bad, you should not do this...
        let playerId = request.params.playerId; // because the id is a path param

        // if id is falsy (null, undefined, NAN, '')
        if(!playerId) {
            response.send(400); // this is the clients fault resulting in 400 error code
            return;
        }


        // this is bad, you should not do this...
        // let sql = "select id, firstName, lastName, gender from players where id = "+id;
        // instead use parameterized sql statements

        let sql = "select gameId, playerId, playerName, Hole1Score, Hole2Score, Hole3Score, Hole4Score, Hole5Score, Hole6Score, Hole7Score, Hole8Score, Hole9Score, Hole10Score, Hole11Score, Hole12Score, Hole13Score, Hole14Score, Hole15Score, Hole16Score, Hole17Score, Hole18Score from Players where playerId = ?";

        let params = [playerId]

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("failed to get a player from the database", error);
                response.sendStatus(500); // this is our fault if we get an error, so 500 error code
            } else {
                if(rows.length > 1){
                    console.log("returned more than 1 row for playerId", playerId);
                    response.sendStatus(500); // again this is still our fault, (500) code
                } else if (rows.length === 0){
                    response.json(null);
                } else {

                    // // grab the first row
                    // // and alter it before sending it on to the client
                    // // we are replacing the gender (0, 1) with (no, yes)
                    // let row = rows[0];
                    // if(row.gender === 1){
                    //     rows.gender = 'yes';
                    // } else {
                    //     rows.gender = 'no';
                    // }

                    response.json(rows[0]);
                }
            }
        })
    };

// what kind of query do we send to get a single item from the db if we know the id


//3

// this function accepts requests and responses
// the requests should include a json object that includes
// -- description
// -- notes
// we will create an entry in the player table inside the database, with the corresponding
//  firstName, lastName, and gender; the id will be auto generated.

// the response will do something ( either return an object or an id) ....

let createPlayer =
    // what kind of query do we send
    // to create an entry in the database

    function(request, response){
        console.log ("POST /player");


        // the colum in the table are the contract between express and the database
        let sql = "INSERT INTO Players (gameId, playerName, Hole1Score, Hole2Score, Hole3Score, Hole4Score, Hole5Score, Hole6Score, Hole7Score, Hole8Score, Hole9Score, Hole10Score, Hole11Score, Hole12Score, Hole13Score, Hole14Score, Hole15Score, Hole16Score, Hole17Score, Hole18Score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";// inserts player object table
        let params = [
            request.body.gameId, // this is the contract with the client side
            request.body.playerName,
            request.body.Hole1Score,
            request.body.Hole2Score,
            request.body.Hole3Score,
            request.body.Hole4Score,
            request.body.Hole5Score,
            request.body.Hole6Score,
            request.body.Hole7Score,
            request.body.Hole8Score,
            request.body.Hole9Score,
            request.body.Hole10Score,
            request.body.Hole11Score,
            request.body.Hole12Score,
            request.body.Hole13Score,
            request.body.Hole14Score,
            request.body.Hole15Score,
            request.body.Hole16Score,
            request.body.Hole17Score,
            request.body.Hole18Score
            // a third param with the client side

        ];

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to create a Player", error);
                response.sendStatus(500); // this is because there was an error on our side
            } else {
                console.log("Player created", rows); // creates the player
                response.json(rows);
            }
        });


    };

// what kind of query do we send to create an entry in the database

//4

// This function takes in a request and response object
// and deletes a single player based on the id that is a path parameter in the request
//if the id is not a valid id, the response will be 'null'
//otherwise, the entire object will be deleted

///players/:id

// what kind of query do we send to delete an entry in the database if we know the id
// What kind of query do we send to

let deletePlayer =

    function(request, response){
        console.log ("DELETE /player/:playerId");

        let playerId = request.params.playerId; // because the playerId is a path param
        let sql = "DELETE FROM Players WHERE playerId = ?"
        let params = [playerId];

        console.log("request.body", request.body);

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to Delete Player", error);
                response.sendStatus(500); // this is because there was an error on Server side
            } else {
                console.log("Player deleted", rows);
                response.json(rows);
            }
        });

    };

// what kind of query do we send to delete an entry in the database if we know the id
// What kind of query do we send to

//5
let updatePlayer =

    function(request, response){
        console.log("PUT /player/:playerId")


        //this column in the table is the contract between express and the database
        let playerId = request.params.playerId; // coming from the path parameter
        if (!playerId) {
            response.sendStatus(400) // client error
            return;
        }

        let sql = `UPDATE Players SET gameId = ?, playerName = ?, Hole1Score = ?, Hole2Score = ?, Hole3Score = ?, Hole4Score = ?, Hole5Score = ?, Hole6Score = ?, Hole7Score = ?, Hole8Score = ?, Hole9Score = ?, Hole10Score = ?, Hole11Score = ?, Hole12Score = ?, Hole13Score = ?, Hole14Score = ?, Hole15Score = ?, Hole16Score = ?, Hole17Score = ?, Hole18Score = ? WHERE playerId = ?`;
        let params = [
            request.body.gameId,
            // this is the contract with the client side
            // another contract with the client side
            request.body.playerName,
            request.body.Hole1Score,
            request.body.Hole2Score,
            request.body.Hole3Score,
            request.body.Hole4Score,
            request.body.Hole5Score,
            request.body.Hole6Score,
            request.body.Hole7Score,
            request.body.Hole8Score,
            request.body.Hole9Score,
            request.body.Hole10Score,
            request.body.Hole11Score,
            request.body.Hole12Score,
            request.body.Hole13Score,
            request.body.Hole14Score,
            request.body.Hole15Score,
            request.body.Hole16Score,
            request.body.Hole17Score,
            request.body.Hole18Score,
            playerId

        ];




        // let sql =  `UPDATE players SET // cannot do this in this way "sql injection"
        //             Id = ${req.params.Id}, firstName = ${req.params.firstName}, lastName = ${req.params.lastName}, gender = ${req.params.gender}
        //             WHERE Id = ${req.params.Id}`;


        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to Update an Player", error);
                response.sendStatus(500); // this is because there was an error on our side
            } else {
                console.log("Player Updated", rows);
                response.sendStatus(202); // no data sent.
            }
        });

    };



module.exports = {getAllPlayers, getSinglePlayer, createPlayer, deletePlayer, updatePlayer};

