//module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback)=> {
    console.log('404 Not Found!');
}

module.exports = handler;