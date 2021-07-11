/*
    CONNECT TO DATABASE
*/
const mongoose = require('mongoose')
//mongoose variable is used to load mongoose npm

//provides a url and options object
mongoose.connect('mongodb://127.0.0.1:27017/movie-api',  {
    useNewUrlParser: true,
    useCreateIndex: true
    //this parses the mongodb string
    //make sure that when mongoose is works with mongoDB, indeexes are created allowing us to access the data we need to access
})

/*
    CREATE A MODEL
*/

const User = mongoose.model('User', {
    userName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
})
//2 arguments are the name of the model and the name of the fields that we want

/*
IF YOU WANT TO CREATE A NEW USER
*/
const nUser = new User({
    userName: 'Keefe',
    password: 'careerfoundry',
    email: 'keefeharrisjr@gmail.com'    
})
//The purpose of a constructor (new) is to create an object and set values if there are any object properties present
// an instance of our model is created

/*
SAVE DATA TO DATABASE
*/
//use methods to save data to database








