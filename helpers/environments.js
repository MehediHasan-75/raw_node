//dependencies

//module scaffolding
const environments = {};
environments.staging = {
    port: 3000,
    envName: 'staging',
    secreteKey: 'asdkdjfkdjfdk',
    maxChecks: 5,
    twilio: {
        fromPhone:'+15074185941',
        accountSid:'',
        authToken:'',
    },
};

environments.production = {
    port: 5001,
    envName: 'production',
    secreteKey: 'asdkdjfkdjfdk',
    maxChecks: 5,
    twilio: {
        fromPhone:'+15074185941',
        accountSid:'',
        authToken:'',
    },
};

//determine which environment was passed

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string'? process.env.NODE_ENV : 'staging';


//export environment object
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment]: environments.staging;
// console.log(environmentToExport);
module.exports = environmentToExport;