const express = require('express'),
    bodyParser = require('body-parser');

const passport = require('passport');
require('./passport');

const mongoose = require('mongoose');
const Models = require('./models.js');
//requires the mongoose package
//requires the mongoose models in models.js

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
//the module for express is called
//the module express is encapsulated 

const { check, validationResult } = require('express-validator');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
let auth = require('./auth')(app);
//Please note the app argument you're passing here. This ensures that Express is available in your “auth.js” file as well.

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true, useUnifiedTopology: true
});
//allows mongoose to connect to database to perform CRUD operations

//Return a greeting message to test server
app.get('/', (req, res) => {
  res.send('Welcome to Movie REST API!');
});

//Return a list of ALL movies to the user
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//Return a list of all users
app.get('/users', (req, res) => {
    Users.find()
    .then((user) => {
        res.json(user);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error : ' + err);
    });
});

//Return a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    Movies.findOne( { Title : req.params.title } )
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//return a single genre by name to user
app.get('/Movies/:Genre.Name', (req, res) => {
    Movie.findOne({Name : req.params.Name})
    .then((genre_name) => {
        res.json(genre_name);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Return a single director by name to user
app.get('/Movies/:Director.Name', (req,res) => {
    Movie.findOne( {Name : req.params.Name} )
    .then((director_name) => {
        res.json(director_name);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Allow new users to register
app.post('/users', [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
       // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    let hashedPassword = User.hashPassword(req.body.password);
    Users.findOne( {Username: req.body.Username} )
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + ' already exist.');
        } else {
          Users.create({
            Username: req.body.Username,
            password: hashedPassword,
            Email: req.body.Email,
            Birthday:  req.body.Birthday,
            Favorites: req.body.Favorites
          })
          .then((user) => {res.status(201).json(user)} )
          .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
          })   
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

//Allow users to update information
app.put('/Users/:Username', (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $set: 
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
        { new: true },
        (err, updatedUser) => {
            if (err){
                console.error(err);
                res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});


//Allow users to add a movie to the list
app.post('/Users/:Username/Movies/:_id', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { Favorites : req.params._id } },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
    });
});

//Allow user to remove a movie from the list
app.delete('/Users/:Username/Movies/:_id', (req, res) => {
    Users.findOneAndUpdate(
        { Username : req.params.Username },
        { $pull: { Favorites : req.params._id } }, 
        { new: true},
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error : ' + err);
            } else {
                res.json(updatedUser);
            }
        }
    );
});

//Allow user to deregister
app.delete('/Users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username : req.params.Username})
    .then((user) => {
        if(!user) {
            res.status(400).send(req.params.Username + ' was not found.');
        } else {
            res.status(400).send(req.params.Username + ' was deleted');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error : ' + err);
    });
});


app.use('/documentation.html', express.static('public'));
//This function automatically routes all requests for static files to their corresponding files within a certain folder on the server

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
//This is an error-handling middleware function that will log all application-level errors to the terminal.


 

//Open port 8080 which enables us to send and recieve through the server
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
