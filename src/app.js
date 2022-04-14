
const path= require('path')
const express= require('express');

const hbs= require('hbs');

const forecast= require('./utils/forecast');
const geoCode= require ('./utils/geoCode');

// console.log(__dirname); // __dirname gives the absolute path to the source directory i.e., the folder

// console.log(__filename); // __filename gives the absolute path to the filename i.e., the html or js file

// Define path for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

const app= express()
const port= process.env.PORT || 3000 // the first value is for heroku

// set up handlesbar engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs') // allows us to set values for a given express settings. the key and value is set

hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))// this is used to customise our server. 

app.get('',(req,resp)=>{

    resp.render('index',{
        title:'Weather',
        name: "Rotimi Olumide",
    }) // render allows us to render one of our views
})

// the get method let us configure what the server should do when a user try to access resources at given route/url. it takes two argument, the appended end of the url to the main route for other routes, though for the main route we input an empty, it also takes a callback function to instruct the server.

// the callback function gets called with two arguments, an object containing information about the request sent to the server, this is called the request and the other one is the response containing a bunch of methods that allows us to customize what we would send to the user

// app.get('',(req,resp)=>{
 
//     resp.send('<h1>Hello express!</h1>')

// })

/// app.com // root route
///app.com/help
//app.com/about

// to send json, send either an array or an object


app.get('/help',(req,resp)=>{

    resp.render('help',{
        number:'08140836550',
        title: 'help',
        name:'Olumide Rotimi',
    })
})

app.get('/about',(req,resp)=>{

    resp.render('about',{
        title:'About Me',
        name:'Rotimi Olumide'
    })
})

app.get('/weather',(req,resp)=>{

    const searchTerm= req.query.address
      
    if (!searchTerm) {
    
        resp.send({

            error:'You must provide an address'
    
        })

        return
        
    } else {
      
        geoCode(searchTerm, (error,{latitude,longitude,location}= {})=>{
    
            if (error) {

                resp.send({error})

                return
                
            }else{
       
                forecast(latitude, longitude, (error, data) => {
    
                    if (error) {
            
                        resp.send({error})

                        return
                        
                    } else {

                        resp.send({
                            location,
                            ...data,
                            address:searchTerm
                        })
                        
                    }
    
                })
            }
        })
       
    }

})


app.get('/products',(req,resp)=>{

    if (!req.query.searchTerm) {

        resp.send({
            error:' You must provide a serach term'
        })

        return
        
    }
    console.log(req.query.searchTerm)

    resp.send({
        products:[]
    })

})

app.get('/help/*',(req,resp)=>{

    resp.render('404',{
        title:'404',
        name:'Olumide Rotimi',
        errorMessage:'help article not found'
    })

})

app.get('*',(req,resp)=>{
    
   resp.render('404',{
       title: '404',
       name:'Olumide Rotimi',
       errorMessage:'Page not found'
   })
})

// the listen method help start up the server. this method takes two argument, a required one which is the port number and an optional one which is a callback function. starting a server is aynchronous process

app.listen(port,()=> console.log(`Server is up on port ${port}` ))

