//dependencies
const http = require('http');

//app object - module scaffolding
const app ={};

//configuration
app.config = {
    port: 3000
};

//create server
/*
The http.createServer() method turns your computer into an HTTP server.
The HTTP Server object can listen to ports on your computer and execute a function, a requestListener, each time a request is made.
The http.createServer() method creates an HTTP Server object.
syntext: http.createServer(requestListener);
*/
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    /*
        server.listen(port, hostname, backlog, callback);
        port	Optional. Specifies the port we want to listen to
        backlog	Optional. Specifies the max length of the queue of pending connections. Default 511
        callback	Optional. Specifies a function to be executed when the listener has been added
        hostname	Optional. Specifies the IP address we want to listen to
    */
    server.listen(app.config.port, ()=> {
        console.log(`listening to port ${app.config.port}`);
    })
}

/*
The requestListener(Optional) function is passed as a parameter to the http.createServer() method.
The requestListener is a function that is called each time the server gets a request.
The requestListener function handles requests from the user, and also the response back to the user
*/


app.handleReqRes = (req, res) => {
    //response handle . any request will get response "Hello world"
    res.end("Hello world");
}

//start the server
app.createServer();