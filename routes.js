//dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');
const {userHandler} = require('./handlers/routeHandlers/userHandler');
const route = {
    //if we hit any route name matched with keys.
    // This will hit in the corresponding functions specified in value.
    'sample': sampleHandler,
    'user': userHandler,
};
module.exports = route;