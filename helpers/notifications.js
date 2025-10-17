//dependencies

const https = require('https');
const querystring = require('querystring');
const {twilio} = require('./environments');
//scaffoling

const notifications = {};

notifications.sendTwilioSMS = (phone, message, callback)=> {
    //input validation

    const userPhone = typeof(phone) == 'string' ? phone.trim() : false;
    const userMessage = typeof(message) == 'string' && message.trim().length > 0 && message.trim().length <= 1600? message.trim(): false;

    if(userPhone && userMessage){
        let options = "";

        //configure the request details for https request
        /*
            curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
            --data-urlencode "From=+15557122661" \
            --data-urlencode "Body=Hi there" \
            --data-urlencode "To=+15558675310" \
            -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
        */
        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };


        //It just creates a request object (req) — like preparing an empty envelope.“I’m opening a channel to Twilio, but I haven’t mailed anything yet.”
        const req = https.request(requestDetails, (res) => {
            if(res.statusCode === 200 || res.statusCode === 201){
                callback(res);
            }
            else{
                callback("error");
            }
        });
        
        req.on('error', (e) => {
            callback(e);
        });


        const payload = {
            From: twilio.fromPhone,
            To: `${userPhone}`,
            Body: userMessage,            
        };
        console.log(payload);
        const data = querystring.stringify(payload);
        //put the actual data (payload) inside that envelope
        req.write(data);

        //req.end() runs, Node.js finalizes the request and transmits it over HTTPS to Twilio.
        req.end();
    }
    else{
        callback(404, {
            Error: 'Given parameters were missing or invalid!'
        });
    }
}
module.exports = notifications;
