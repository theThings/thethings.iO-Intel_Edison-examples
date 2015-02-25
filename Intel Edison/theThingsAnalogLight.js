var groveSensor = require('jsupm_grove');

var light = new groveSensor.GroveLight(0);

var theThingsAPI = require('thethingsio-api')

var client = theThingsAPI.createClient()

var object = {
    "values": [
        {
            "key": 'analog_light',
            "value": "light_value"
        }
    ]
}

client.on('ready', function () {
    setInterval(function () {
        object.values[0].value = light.value()
        client.thingWrite(object, function (error, data) {
            console.log(error ? error : data)
        })
        console.log("send", object)
    }, 1000)
})

