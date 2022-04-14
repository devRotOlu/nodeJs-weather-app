

const weatherForm= document.querySelector('form');
const search= document.querySelector('input');
const message= document.getElementsByClassName('response');


weatherForm.addEventListener('submit',e=>{

    e.preventDefault()

    const location=search.value

    message[0].innerHTML='Loading.....';message[1].innerHTML=''

    fetch(`/weather?address=${location}`)
    .then(response=>{

        response.json().then(data=>{
            
            if (!data.error) {

                const{location, weather, temperature,feelsLike,address,humidity}= data

                message[0].innerHTML= '<div><h3>'+ location +'.</h3> <p >'+ weather +'.Temperature at '+ temperature +' but it feels like '+ feelsLike +', the humidity is '+ humidity +' %. '+ address +' </p></div>'
                
            }else{

                message[1].innerHTML='<p>'+ data.error +'</p>';
                message[0].innerHTML=''
            }

        })

    })

})
