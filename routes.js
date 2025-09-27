//dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');
const route = {
    //if we hit any route name matched with keys.
    // This will hit in the corresponding functions specified in value.
    'sample': sampleHandler,
};
module.exports = route;