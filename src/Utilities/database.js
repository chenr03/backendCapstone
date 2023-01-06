const mysql = require("mysql");

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect();


// this is async
connection.query("select now()" , function(err, rows){

    if(err){
        console.log("Connection Incorrect: You're a Moron", err);
    } else {
        console.log("Date and Time?, ", rows);
    }
});

module.exports = connection;