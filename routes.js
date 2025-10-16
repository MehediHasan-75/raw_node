//dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');
const {userHandler} = require('./handlers/routeHandlers/userHandler');
const {tokenHandler} = require('./handlers/routeHandlers/tokenHandler');
const route = {
    //if we hit any route name matched with keys.
    // This will hit in the corresponding functions specified in value.
    'sample': sampleHandler,
    'user': userHandler,
    'token': tokenHandler,
};
module.exports = route;