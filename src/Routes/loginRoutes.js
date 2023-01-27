let express = require("express");

let router = express.Router();

let loginController = require("../Controller/loginController");

// let auths = require("../middleware/authorization");


// GET /hello

router.get("/hello", loginController.hello);

if(loginController){
    console.log('Logged in 😀');
} else {
    console.log('Error', Error)
}

module.exports = router;