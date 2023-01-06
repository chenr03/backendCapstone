let express = require("express");

let router = express.Router();

let authController = require("../Controller/authController");


// unprotected register route - anyone can gain access to this route.
router.post("/register", authController.register);

// this is the unprotected login route - anyone has access to this, in order to app/ webpage.
router.post("/login", authController.login);

module.exports = router;