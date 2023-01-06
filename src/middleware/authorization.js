let jwt = require("jsonwebtoken");

let checkJWT = function(request, response, next){
    let signedToken;
    let headerValue = request.get("Authorization");
    console.log('headerValue: ', headerValue)
        if(headerValue){
            let parts = headerValue.split(" ")
            signedToken = parts[1];
        }

        if(!signedToken){
            console.log("Missing the signed token: ");
            request.sendStatus(403);
            return;
        }

        // read the token from the request header

            // we are going to verify that the token is good
            // which means that it has not been messed with or changed.

            // if the token is good, then call the next function in the chain

            // if the token is bad,
            // then return an error code potentially a 404 or 400 or 403
        try {
            // this will either throw an error or return the unsigned token
             jwt.verify(signedToken, process.env.JSONWEBTOKEN_SECRET, function(error, decoded){
                console.log('Error: ', error);
                console.log('Decoded: ', decoded);
                request.userInfo = {
                    "username": decoded.username,
                    "userId": decoded.UserId
                };
                next();
            });
            // console.log('Unsigned Token :', unsignedToken)


            // the only way to get to this line, is if line 28 does not throw an error
        } catch(error){
            // the only way to get to this line, is if any code in the try block throws an error.
            console.log("Failed to verify correct token", error);
            response.sendStatus(403);

        }

            // this means this token was valid because if no token passed, the function would have quit at line 15
            // if the token passed and was bad the function would have quit at line 34
            // so if I am here, that means I have a token, and it is valid



}

module.exports = {checkJWT};