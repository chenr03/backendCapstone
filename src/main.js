let express = require('express');

require("dotenv").config();

let PORT = process.env.PORT || 8080;

let discGolfApp = express();
let cors = require('cors')


discGolfApp.use(cors())

// message from backend
discGolfApp.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Community Disc Golf Server",
    });
});







// Packages that are being used on the discGolfApp:
discGolfApp.use(express.json());
discGolfApp.use(express.static("./discGolfApp2/public"));


// Authorization Routes and Login Routes that are being used on the discGolfApp:
let authRoutes = require("./Routes/authorizationRoutes")
discGolfApp.use(authRoutes);

let loginRoutes = require("./Routes/loginRoutes")
discGolfApp.use(loginRoutes);

// discGolfApp.use("/success", function(request, response){
//     response.send("Deployed Successfully")
// });


// I will capture all the Disc Golf Routes we have
// in one place, instead of defining the Routes directly
// on the app object

let playerRoutes = require("./Routes/playerRoutes");
discGolfApp.use(playerRoutes);

let userRoutes = require("./Routes/userRoutes");
discGolfApp.use(userRoutes);

let gameRoutes = require("./Routes/gameRoutes");
discGolfApp.use(gameRoutes);

let courseRoutes = require("./Routes/courseRoutes");
discGolfApp.use(courseRoutes);

// only for users table and login

// console.log(player_1_Routes)


discGolfApp.listen(PORT, function(){
    console.log('Application started on PORT', PORT);
})




