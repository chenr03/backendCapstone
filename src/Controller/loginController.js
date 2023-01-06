let hello = function(request, response) {

    console.log('hello() in login controller');
    response.send("Deployed Successfully");
}

let privateHello = function(request, response) {

    let userName = request.userInfo.username;

    console.log(`Private hello in login controller`);
    response.send(`Hello there, you are now logged in` +userName);
}

module.exports = {hello, privateHello};

