//initial file to start the node server and workers(background process)

//dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');

//app object - module scaffolding
const app ={};

 
app.init = () => {
   //start the server
   server.init();

   //start the worker
   workers.init();
}

app.init();

//export the app
module.exports = app;