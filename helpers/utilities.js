//dependencies
const crypto = require('crypto');
const environments = require('./environments');
//module scaffolding
const utilities = {};

//parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    }catch{
        output = {};
    }

    return output;
}

utilities.hash = (str) => {
    if(typeof(str) == 'string' && str.length > 0){
        const hash = crypto
        .createHmac('sha256', "12j32jie32j4")
        .update(str)
        .digest('hex');
        return hash;
    }
    return false;
}
utilities.createRandomString = (strLength) => {
    let length = strLength;
    length = typeof(strLength) === 'number' && strLength > 0 ? strLength: false;
    let output = '';
    if(length){
        let possiblecharacters = 'abcdefghijklmnopqrstuvwxyz';
        let output = '';
        for(let i = 1; i<=length; i++){
            let randomCharacter = possiblecharacters.charAt(Math.floor(Math.random()* possiblecharacters.length));
            output += randomCharacter;
        }
        return output;
    }
    return false;
}
module.exports = utilities;