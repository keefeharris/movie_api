const express = require('express'),
    morgan = require('morgan');
//the module for express is called
const app = express();
//the module express is encapsulated 


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

app.get('/', (req, res) => {
    res.send('Welcome to my app!');
  });
  
app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});