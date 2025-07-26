const request = require('request')

const geocode = (Adress, callBack) => {
    
    const url =  `http://api.positionstack.com/v1/forward?access_key=0bd9f3019035d1c6b0ebe36e3b3a532d&query=${encodeURIComponent(Adress)}`
    request({ url, json:true }, (error, { body })=>{
       
        if (error){callBack('unable to connect to WiFi', undefined)}

        else if (body.data.length === 0){

                 callBack("location not found", undefined)
                 }
         else{
                const {latitude, longitude, name} = body.data[0]
                
                callBack(undefined,{
                  latitude,
                  longitude,
                  name,
                    
                  })
             }       
    })
       
}

module.exports = geocode


