//dependencies
//module scaffolding

const handler = {};
handler.userHandler = (requestProperties, callback) => {

    const acceptedMehtods = ['get', 'post', 'put', 'delete'];
    if(acceptedMehtods.indexOf(requestProperties.method)> -1){
        handler._users[requestProperties.method](requestProperties, callback);
    }
    else{
        callback(405, {message : "This method is not allowed"});
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {

};

handler._users.get = (requestProperties, callback) => {

};

handler._users.put = (requestProperties, callback) => {

};

handler._users.delete = (requestProperties, callback) => {

};

module.exports = handler;
