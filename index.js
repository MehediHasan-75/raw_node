//dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder');
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
    //request handling .
    //get the url and parse it
    /*
    When you parse a URL, you get a URL object with the following properties:

        href: The full URL that was parsed
        protocol: The protocol scheme (e.g., 'http:')
        host: The full host portion (e.g., 'example.com:8080')
        hostname: The hostname portion (e.g., 'example.com')
        port: The port number if specified
        pathname: The path section of the URL
        search: The query string including the leading ?
        query: Either the query string without the ?, or a parsed query object
        hash: The fragment identifier including the #
    */
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimedPath = path.replace(/^\+|\?+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headerObject = req.headers;
    
    const decoder = new StringDecoder('utf-8');
    let data = "";

 /*
    HTTP sends POST data as a stream of binary chunks (Buffer objects).
    The 'data' event on the request (req) object is fired repeatedly as chunks arrive.
    By listening to the 'data' event, we can collect these chunks (buffers) as they arrive.
    The 'end' event fires when all chunks have been received, signaling that the full request body is ready.
*/
    req.on('data', (buffer) => {
        data += decoder.write(buffer);
    })

    req.on('end', ()=>{
        data += decoder.end();
        console.log(data);
        res.end("Hello world");
    })
    //response handle . any request will get response "Hello world"

}

//start the server
app.createServer();

/*
Client (Browser/Postman)
   |
   | HTTP request
   v
req object (IncomingMessage)
   - req.url
   - req.method
   - req.headers
   - req.on('data')
   - req.on('end')
   |
   v
Server handles data
   |
   v
res object (ServerResponse)
   - res.write()
   - res.end()
   |
   v
Client receives response
*/