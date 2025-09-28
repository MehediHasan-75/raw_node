//dependencies

const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

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
            callback('There was an error. file may be exist before');
        }
    });
}

lib.read = (dir, file, callback) => {
    fs.readFile(lib.basedir+dir+'/'+file+'.json', 'utf8', (err, data) => {
        callback(err, data);
    })
}

lib.update = (dir, file, data, callback) => {
    //file open for writing
    fs.open(lib.basedir+dir+'/'+file+'.json', 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            //convert the data to string
            const stringData = JSON.stringify(data);

            //truncate the file(file khali kora)

            fs.ftruncate(fileDescriptor, (err) => {
                if(!err){
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err){
                            fs.close(fileDescriptor, (err) => {
                                if(!err){
                                    callback(false);
                                }
                                else{
                                    callback('Error closing file!');
                                }
                            })
                        }
                    });
                }
                else{
                    callback("error writing to the file!");
                }
            })
        }
        else{
            console.log(`error ${err}`);
        }
    })
}

lib.delete = (dir, file, callback) => {
    fs.unlink(lib.basedir+dir+'/'+file+'.json', (err) => {
        if(!err){
            callback(false);
        }
        else{
            callback("error deelting file");
        }
    })
}
module.exports = lib;