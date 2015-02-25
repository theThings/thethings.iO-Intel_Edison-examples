var m = require('mraa');
console.log('MRAA Version: ' + m.getVersion()); 

var myDigitalPin = new m.Gpio(3); 
myDigitalPin.dir(m.DIR_IN); 

var theThingsAPI = require('thethingsio-api')

var client = theThingsAPI.createClient()

var object = {
    "values": [
        {
            "key": 'voltage',
            "value": "lightValue"
        }
    ]
}

client.on('ready', function () {
    setInterval(function () {
		var myDigitalValue =  myDigitalPin.read(); 
        object.values[0].value = myDigitalValue
        client.thingWrite(object, function (error, data) {
            console.log(error ? error : data)
        })
        console.log("send", object)
    }, 1000)
})







