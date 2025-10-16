/*
If so user hit any rout that need authentication the user will not log in again and again. 
Just token is given to the client at first login and it will send token with every request.
*/
//dependencies

const data = require('../../lib/data');


//module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMehtods = ['get', 'post', 'put', 'delete'];

    if(acceptedMehtods.indexOf(requestProperties.method) > -1){
        handler._token[requestProperties.method](requestProperties, callback);
    }
    else{
        callback(405);
    }
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {

};
handler._user.get = (requestProperties, callback) => {

};
handler._user.put = (requestProperties, callback) => {

};
handler._user.delete = (requestProperties, callback) => {

};

module.exports = handler;