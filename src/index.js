require("dotenv").config();
let express = require('express');
let PORT = process.env.PORT || 8080;
let discGolfApp = express();
let cors = require('cors')

// App is using Cors: //
discGolfApp.use(cors())
discGolfApp.options('*', cors())
// discGolfApp.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE"
//     );
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
//     );
//     next();
// });

// Message from backend
discGolfApp.get("/", (req, res) => {
    // res.set("Access-Control-Allow-Origin", "*");
    res.json({
        message: "Welcome to the Community Disc Golf Server",
    });
});

// Packages that are being used on the discGolfApp:
discGolfApp.use(express.json());
discGolfApp.use(express.static("./backendCapstone/public"));

// Authorization Routes and Login Routes that are being used on the discGolfApp:
let authRoutes = require("./Routes/authorizationRoutes")
discGolfApp.use(authRoutes);

let loginRoutes = require("./Routes/loginRoutes")
discGolfApp.use(loginRoutes);


// All Disc Golf Routes

let playerRoutes = require("./Routes/playerRoutes");
discGolfApp.use(playerRoutes);

let userRoutes = require("./Routes/userRoutes");
discGolfApp.use(userRoutes);

let gameRoutes = require("./Routes/gameRoutes");
discGolfApp.use(gameRoutes);

let courseRoutes = require("./Routes/courseRoutes");
discGolfApp.use(courseRoutes);

// Listening on the PORT: //
discGolfApp.listen(PORT, function(){
    console.log('Application started on PORT', PORT);
})




