//dependencies

const fs = require('fs');
const path = require('path');

//module scaffolding
const lib = {};

//base directory of the data folder

lib.basedir = path.join(__dirname, '/../.data/');


//write data to file

lib.create = (dir, file, data, callback) => {
    //open ofr wiriting
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            //convert javascript object(data) to string
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if(!err){
                    fs.close(fileDescriptor, (err) => {
                        if(!err){
                            callback(false);
                        }
                        else{
                            callback("Error closing the new file!");
                        }
                    }); 
                }
                else{
                    callback("Error writing to new file!");
                }
            });
        }
        else{
            callback(err);
        }
    });
}
module.exports = lib;