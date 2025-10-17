//dependencies
const data = require('./data');

//worker object - module scaffolding
const workers ={};

workers.gatherAllChecks = () => {
    //get all the checks
}
workers.loop = () => {
    setInterval(()=> {
        workers.gatherAllChecks();
    }, 1000 * 60);
};

//start the worker
workers.init = () => {
    //executes all the checks
    workers.gatherAllChecks();

    //call the loop so that checks continue
    workers.loop();
};


module.exports = workers;