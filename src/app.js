const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const myHtml = path.join(__dirname, '../public')
const partials = path.join(__dirname, '../templates/partials')



app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(partials)




app.use(express.static(myHtml))

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help Page",
        description:"This is the help page of our Weather app",
        author:"Kian Christopher",
    })
})

app.get('', (req,res)=>{
    res.render('index', {
        title:"Main Page",
        author:"Kian Christopher",
        description:"This is the Main Page of our weather App"
    })  
})

app.get("/weather", (req, res)=> {
    console.log(req.query)
    if(!req.query.address){
        return res.send('ERROR : Empty Adress Search Query')
    }
    else{
        const address = req.query.address
         geocode(address, (error, {latitude,longitude} = {}) => {
            if(error){
                return res.send({error})
            }
            else {
               
               
                forecast(longitude, latitude, (err, response)=>{
                    if (err){
                        return res.send({err})
                    }
                    else {
                        let {country, weather_descriptions,name, message} = response
                        res.send({
                            forecast: weather_descriptions[0],
                            location:country,
                            address: name,
                            message
                        })
                    }
                })
            }
        }
            
        )

      
        
    }
   
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title:"About",
        author:"Kian Christopher",
        description:"This is the about page of our weather app"
    })
})



app.get('/help/*splat', (req,res) => {
    res.render('help', {
        title:"About",
        author:"Kian Christopher",
        error: '404',
        errorMessage: 'Page not Found',
    })
})

app.get('/about/*splat', (req, res) => {
    res.render('about', {
        title:"404",
        author:"Kian Christopher",
        error: '404',
        errorMessage: 'Page not Found',
    })
})

app.get('/*splat', (req, res) => {
    res.render('index', {
        title:"404",
        author:"Kian Christopher",
        error: '404',
        errorMessage: 'Page not Found',
    })
} )

app.listen(3000, () => {
    console.log("server is running on port 3000")
})