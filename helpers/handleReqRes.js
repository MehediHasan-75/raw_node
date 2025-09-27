const url = require('url');
const {StringDecoder} = require('string_decoder');
 const routes = require('../routes');
 const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');
const { stat } = require('fs/promises');
//modle scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
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
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headerObject = req.headers;
    
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headerObject,
    };

    const decoder = new StringDecoder('utf-8');
    let data = "";
    console.log(trimmedPath);
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    // console.log(requestProperties);
    chosenHandler(requestProperties, (statusCode, payload)=> {
         statusCode = typeof(statusCode) === 'number' ? statusCode: 5000;
         payload = typeof(payload) === 'object' ? payload: {};

         const payloadString = JSON.stringify(payload);

         //return the final response
         res.statusCode = statusCode;
         res.end(payloadString);
    })
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
module.exports = handler;