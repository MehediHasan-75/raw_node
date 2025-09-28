//module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback)=> {
    // console.log(requestProperties);
    callback(404,{
        messsage: "404 not found!",
    });
};

module.exports = handler;