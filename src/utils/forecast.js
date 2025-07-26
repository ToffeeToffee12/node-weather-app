const request = require("request");


const forecast = (long, lat, callback) => {
    let coordinates = `${lat},${long}`
    

    const weatherUrl = `https://api.weatherstack.com/current?access_key=7ad9ab7a034f6fb545b954d07137950f&query=${encodeURIComponent(coordinates)}&units=f`
   
    request({url:weatherUrl, json: true}, (error, { body } = data)=>{

        if (error){
        callback('Please Connect to the wifi!', undefined)
        
        }
        else if (body.error){
            callback('Place does not exist', undefined)
            
        }
        else{
            
            

            const{ location:dataBody, current:dataWeather, } = body

            
            
            let {name, country } = dataBody
            let {temperature, weather_descriptions, feelslike, humidity} = dataWeather   
             
             
             
             const message = `it is ${weather_descriptions} out ${name} of ${country}. Hitting ${temperature} degrees while feeling ${feelslike}  degrees out!`
             const dataOBJ = {country ,name , temperature, weather_descriptions, message, humidity}
            callback(undefined, dataOBJ)
        }
    })
}


  module.exports = forecast