//dependencies
const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities');
const utilities = require('../../helpers/utilities');
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
    //validation
    const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length > 0 ? requestProperties.body.phone : false;
    const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
    const toAgreement = typeof(requestProperties.body.toAgreement) === 'boolean' ? requestProperties.body.toAgreement : false;
    console.log(requestProperties);
    if(firstName && lastName && phone && password && toAgreement){
        //make sure that user dosenot already exists
        data.read('users', phone, (err, user) => {
            if(err){
                //next work;
                let useObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    toAgreement,
                }
                console.log(useObject);
                data.create('users', phone, useObject, (err) => {
                    if(!err){
                        callback(200, {
                            message: "User created successfully",
                        });
                    }
                    else{
                        callback(500, {
                            message: "Could not create user",
                        })
                    }
                })
            }
            else{
                callback(500, {
                    error: 'User already exists',
                })
            }
        });
    }
    else{
        callback(400, {
            error: "Problem in your request",
        })
    }
};

handler._users.get = (requestProperties, callback) => {
    //check query string and if the phone number is valid
    const phone = typeof(requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length > 0 ? requestProperties.queryStringObject.phone : false;
    if(phone){
        //look up the user
        data.read('users', phone, (err, data) => {
            const user = utilities.parseJSON(data);
            if(!err && user){
                delete user.password;
                callback(200, user);
            }
            else{
                callback(404, {
                    error: "Requested user was not found",
                });
            }
        })
    }
    else{
        callback(404, {
            error: "Requested user was not found",
        });
    }
};

handler._users.put = (requestProperties, callback) => {

};

handler._users.delete = (requestProperties, callback) => {

};

module.exports = handler;
