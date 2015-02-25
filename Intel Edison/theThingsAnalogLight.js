var groveSensor = require('jsupm_grove');

var light = new groveSensor.GroveLight(0);

var theThingsAPI = require('thethingsio-api')

//create Client
var client = theThingsAPI.createClient()

//The object to write.
var object = {
    "values": [
        {
            "key": 'analog_light',
            "value": "light_value"
        }
    ]
}

client.on('ready', function () {
//write the object
    setInterval(function () {
        object.values[0].value = light.value()
        client.thingWrite(object, function (error, data) {
            console.log(error ? error : data)
        })
        console.log("send", object)
    }, 1000)
})

