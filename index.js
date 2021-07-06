const express = require('express');
//the module for express is called
const app = express();
//the module express is encapsulated 
const morgan = require('morgan');
//the module for morgan is called
const bodyParser = require('body-parser');
//the module for body-parser is called
const uuid = require('uuid');
//the module for uuid is called



let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};
//this middle ware logs the url in the terminal everytime a request is made

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};
//this is a middleware function that logs a time upon req (timestamp)

app.use(myLogger);
app.use(requestTime);
//invoking the app.use on the middleware function ensures that these middleware functions will be called upon every request
app.use(morgan('common'));
/*
Morgan’s “common” format, which logs basic data such as IP address, the time of the request, 
the request method and path, as well as the status code that was sent back as a response.
"check terminal for date, time, etc....." 
*/

app.use(express.static('public'));
//This function automatically routes all requests for static files to their corresponding files within a certain folder on the server

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
//This is an error-handling middleware function that will log all application-level errors to the terminal.
app.use(bodyParser.json());

let user = [
    {
        username: "",
        email: "",
        favorites: ""
    }
];

let director = [
    {
        name: "",
        birthYear: "",
        bio: ""
    }
];

let movie = [
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    },
    {
        title: "",
        genre: "",
        description: ""
    }
];

app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

app.get('/movie', (req, res) => {
  res.json(movie);
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});