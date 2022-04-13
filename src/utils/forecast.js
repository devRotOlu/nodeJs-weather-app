
const request = require('request');

const forecast=(lat,long,callback)=>{

    let url= `http://api.weatherstack.com/current?access_key=16056c0b3bb12e9fdf959162567ec0a1&query=${long},${lat}&units=f`;

    request({url,json:true},(error,{body})=>{

        if (error) {

            callback('Unable to connect with weather service ');

        
        }else if(body.error){

             callback('Unable to make weather forecast, try with a different search term')

        }else{
            
            const {weather_descriptions, temperature,feelslike}=body.current

            callback(undefined,{
                weather:weather_descriptions[0],
                temperature:`${temperature} degrees out`,
                feelsLike:`${feelslike} degrees out`,
            })
         }
    })

}

module.exports=forecast