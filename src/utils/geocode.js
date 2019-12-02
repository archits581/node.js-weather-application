const request = require('request')

const geocode = (address, callback)=>{
    request({
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJjaGl0czU4MSIsImEiOiJjazB1d3pzaGcwbGl3M2lwazljeG9tbWFjIn0.sAnYXEqq2T4ouhsHFuhAXg',
        json: true //Data needed in json format
        }, (error, {body})=>{
        if(error){
            callback('Unable to connect to the internet!') //callback function passes only error object
        }
        else if(body.features.length === 0){
            callback('Unable to find the location. Please try again')//callback function passes only error object
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode