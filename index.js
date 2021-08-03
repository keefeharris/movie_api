const express = require('express');
const app = express();
//the module for express is called
//the module express is encapsulated 

const mongoose = require('mongoose');
const Models = require('./models.js');
//requires the mongoose package
//requires the mongoose models in models.js

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true, useUnifiedTopology: true
});
//allows mongoose to connect to database to perform CRUD operations


const bodyParser = require('body-parser');
//the module for body-parser is called
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require('morgan');
//the module for morgan is called
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





//Return a greeting message to test server
app.get('/', (req, res) => {
  res.send('Welcome to Movie REST API!');
});

//Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
    Movies.find()
    .then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
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
app.get("/Movies/:Title", (req, res) => {
    const mtitle = req.params.Title;
    Movies.findOne({Title : mtitle})
    .then((movie_t) => {
        res.json(movie_t);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//return a single genre by name to user
app.get('Movies/:Genre.Name', (req, res) => {
    Movie.findOne({Name : req.params.Name})
    .then((genre_name) => {
        res.json(genre_name);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});
/* ----old request
/*
function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}

app.get('/genres/:name', (req, res) => {
    const _gname = req.params.name
    genres.forEach((genre_name) => {
        if (genre_name.name === capitalizeTheFirstLetterOfEachWord(_gname)) {
            res.json(genre_name);
        }
    })
    return res.status(404).send("Genre not found.");
});
*/

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

/* -----old request
app.get('/directors/:name', (req, res) => {
    const _name = req.params.name
    directors.forEach((director) => {
        if (director.name === capitalizeTheFirstLetterOfEachWord(_name)) {
            res.json(director);
        }
    })
    return res.status(404).send("Director not found.");
});
*/

//Allow new users to register
app.post('/users', (req, res) => {
    Users.findOne( {Username: req.body.Username} )
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + ' already exist.');
        } else {
          Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
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
/* ----old request
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.name) {
        const message = 'The username is missing.';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
});
*/






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
/* ----old request
app.put('/users/:username', (req, res) => {
    let user = users.find((p_user) => {
        return p_user.username === req.params.username
    });

    if (user) {
        user.username === req.params.username;
        res.status(201).send('User ' + req.params.username + ' will be assigned a new username.');
    } else {
        res.status(404).send('Username' + req.params.username + 'was not found');
    };
});
*/

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
/*
app.post('/users/:movieList', (req, res) => {
    let newMovie = req.body;

    if (!newMovie.movieList) {
        const message = 'Unable to add movie to list.';
        res.status(400).send(message);
    } else {
        newMovie.id = uuid.v4();
        users.push(newMovie);
        res.status(201).send(newMovie);
    }
});
*/

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
