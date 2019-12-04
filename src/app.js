const path = require('path');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPAth = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// SETUP HANDLEBARS ENGINE AND LOCATION
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPAth));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Artis Gulbis'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Artis Gulbis',
        title: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Did you know, you can get smarter by learning :)',
        title: 'Help',
        name: 'Artis Gulbis'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404',
        name: 'Artis Gulbis'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found! 404',
        title: '404',
        name: 'Artis Gulbis'
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});