const request = require('request')


const forecast = (lat, lon, callback)=>{
    const url = 'https://api.darksky.net/forecast/23de926a8d07ecacd7549d7e887d8af2/' + lat +',' + lon
    request({
        url,
        json:true
    }, (error, {body} = {})=>{
        if(error){
            callback('Unable to connect to the internet!')
        }else if(body.code === 400){
            callback('Invalid co-ordinates!')
        }
        else{
            callback(undefined, {
                temperature: body.currently.temperature,
                precipitation_probability: body.currently.precipProbability,
                description:body.daily.summary
            })
        }
    })
}

module.exports = forecast