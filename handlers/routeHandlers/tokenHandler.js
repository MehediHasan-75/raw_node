/*
If so user hit any rout that need authentication the user will not log in again and again. 
Just token is given to the client at first login and it will send token with every request.
*/
//dependencies

const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities')

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
    const phone = typeof(requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length > 0 ? requestProperties.queryStringObject.phone : false;
    const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
    //validy of request 
    if(phone && password){
        //check if database has this phone and match password?
        data.read('users', phone, (err, userData)=> {
            let hashedpassword = hash(password);
            if(hashedpassword === userData.password){
            }
            else{
                callback(404, {
                    error: 'password is not valid',
                });
            }
        })
    }
    else{
        callback(404, {
            error: "You have a problem in your request",
        });
    }
};
handler._user.get = (requestProperties, callback) => {

};
handler._user.put = (requestProperties, callback) => {

};
handler._user.delete = (requestProperties, callback) => {

};

module.exports = handler;