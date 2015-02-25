var upm_grove = require('jsupm_grove');

var groveRotary = new upm_grove.GroveRotary(1);

var theThingsAPI = require('thethingsio-api')

var client = theThingsAPI.createClient()

var object = {
    "values": [
        {
            "key": 'rotation',
            "value": "rotation_value"
        }
    ]
}

client.on('ready', function () {
    setInterval(function () {
        object.values[0].value = groveRotary.abs_deg()
        client.thingWrite(object, function (error, data) {
            console.log(error ? error : data)
        })
        console.log("send", object)
    }, 1000)
})




