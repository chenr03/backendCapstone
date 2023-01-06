let database = require("../Utilities/database");
let jsonwebtoken = require("jsonwebtoken");

// this will help us with storing the password hash and checking it against the system

let argon2 = require("argon2");

// we expect in the body an object that contains the username and password and full name

let register = async function(request, response){

    let username = request.body.username;
    let password = request.body.passwordHash;

    let passwordHash;
    try{
        passwordHash = await argon2.hash(password);
    } catch(error){
        console.log(error);
        response.sendStatus(500); // something went wrong when attempting to hash on the server side, our fault
        return;
    }

    let sql = 'INSERT INTO Users (username, passwordHash) VALUES (?, ?)';
    let params = [username, passwordHash];

    database.query(sql, params, function(error){
        if(error){
            console.log('Failed to register', error)
            response.sendStatus(400);
        } else {
            response.sendStatus(200);
        }
    })
}

let login = function(request, response){
    let username = request.body.username
    let password = request.body.passwordHash

    let sql = "SELECT userId, passwordHash FROM Users where username = ?"
    let params = [username];

    // plain old callbacks
    database.query(sql, params, async function(error, rows){
        if(error){
            console.log('Did not receive passwordHash', error);
            response.sendStatus(500); // our fault
        } else {
            if(rows.length > 1) {
                console.log("Returned too many rows for username ", username);
                response.sendStatus(500); // our fault again
            } else if (rows.length === 0){
                console.log("Username is not Registered in the System", error);
                response.sendStatus(400); // client's fault
            } else {
                let passwordHash = rows[0].passwordHash;
                let userId = rows[0].userId;

                let pass = false;
                try {
                    pass = await argon2.verify(passwordHash, password);
                } catch (error) {
                    console.log("Failed to verify password", error);
                }
                if (pass) {
                    let token = {
                        "UserId": userId,
                        "username": username
                    };

                    // sign this token, and send the signed token back
                    let signedToken = jsonwebtoken.sign(token, process.env.JSONWEBTOKEN_SECRET);
                        response.json(signedToken);
                    } else {
                        response.sendStatus(400); // client error
                }
            }
        }
    })
}

module.exports = {register, login};