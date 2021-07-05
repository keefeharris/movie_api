const express = require('express');
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
//this is a middleware function that logs a time upon req

app.use(myLogger);
app.use(requestTime);
//invoking the app.use on the middleware function ensures that these middleware functions will be called upon every request


app.get('/', (req, res) => {
  let responseText = 'Welcome to my app!';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.get('/secreturl', (req, res) => {
  let responseText = 'This is a secret url with super top-secret content.<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);

});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});