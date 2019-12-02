const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


//defining paths for express configuration
const app = express()

const port = process.env.PORT || 3000

const public_dir_path = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setting up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//set up static directory to serve
app.use(express.static(public_dir_path))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Archit'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Archit'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'here is some useful info..',
        title: 'Help',
        name: 'Archit'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/weather2', (req, res)=>{
    if(!req.query.lat || !req.query.long){
        return res.send({
            error: 'You must provide an address'
        })
    }

    forecast(req.query.lat, req.query.long, (error, forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a location'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        name: 'Archit',
        message: 'Page Not Found!'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})
