
const request= require('request');

const geoCode=(address, callback)=>{

    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicm90aW1pZGV2IiwiYSI6ImNsMW9qaGgyOTA1MHMzZW5xeng5amlqZHEifQ.YwL8VY1abwCWFdY_h6Temw&limit=1`;

    request({url,json:true},(error,{body} = {})=>{

        if (error) {
    
            callback('Unable to connect to location services');
            
        } else if(!body.features.length) {
    
            callback('Unable to find location, try with a different search term.')
            
        }else{
    
            const [longitude,latitude]=body.features[0].center;
    
            const {place_name: location}= body.features[0]
    
            callback(undefined,{
                longitude,
                latitude,
                location,
            })
    
        }
    
    })
    
}


module.exports=geoCode