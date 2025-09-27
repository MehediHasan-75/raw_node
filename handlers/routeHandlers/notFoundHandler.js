//module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback)=> {
    callback(404,{
        messsage: "404 not found!",
    });
};

module.exports = handler;