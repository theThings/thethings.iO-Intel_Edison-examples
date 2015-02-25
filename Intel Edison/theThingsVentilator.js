var m = require('mraa'); 
console.log('MRAA Version: ' + m.getVersion()); 

var myLed = new m.Gpio(2); 
myLed.dir(m.DIR_OUT); 

var theThingsAPI = require('thethingsio-api');

var KEY = 'air';

var client = theThingsAPI.createClient();

client.on('error', function (error) {
    console.log('Error:', error)
})


client.on('ready', function () {
    var request = client.thingSubscribe({keepAlive: 10000}, function (error, data) {
        if (error) {
            console.error(error)
            process.exit()
        } else {
            console.log(data);
			var value=data[0].value;		
			//turn on the lights when 1 is read from theThings
			if(value==1){
				var ledState = true; 
				myLed.write(ledState?1:0);										
			}
			//turn off the lights when 0 is read from theThings
			if(value==0){
				var ledState = false; 
				myLed.write(ledState?1:0);										
			}      
        }
    })

    request.on('subscribed', function () {
        console.log('Subscribed successfully')
    })

    request.on('keepAlive', function () {
        console.log('Got keepAlive')
    })
   
    request.on('disconected', function () {
        console.log('Disconected, exiting...')
        process.exit()
    })
})