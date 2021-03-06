const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${req.method} ${req.url} at ${now}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public-folder'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Divya!!!</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/portfolio', (req,res) => {
    res.render('portfolio.hbs', {
       pageTitle: 'Portfolio' 
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});