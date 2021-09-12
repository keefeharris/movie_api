const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
const cors = require('cors');

const { check, validationResult } = require('express-validator');

/*
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true, useUnifiedTopology: true
});
*/
mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/documentation", express.static("public"));
let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

//Return a greeting message to test server
app.get('/', (req, res) => {
    res.send('Welcome to kwhjmoviesdb API!');
});

app.get("/documentation", (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/documentation.html`);
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
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
        .then((user) => {
            res.json(user);
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Error : ' + err);
        });
});

//Return a single movie by title to the user
app.get("/movies/:Title", passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ "Title": { $regex: req.params.Title, $options: "i" } })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//return a single genre by name to user
app.get('/genre/:Genre', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ "Genre.Name": { $regex: req.params.Genre, $options: "i" } })
        .then((movie) => {
            res.json(movie.Genre);
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Return a single director by name to user
app.get('/directors/:Director', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ "Director.Name": { $regex: req.params.director, $options: "i" } })
        .then((movie) => {
            res.json(movie.Director);
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Allow new users to register
app.post('/users',
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric charachters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not aappear to be valid').isEmail()
    ],

    (req, res) => {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({ Username: req.body.Username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + ' already exist.');
                } else {
                    Users.create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday,
                        Favorites: req.body.Favorites
                    })
                        .then((user) => {
                            res.status(201).json(user)
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send('Error: ' + error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
    });

//Allow users to update information
app.put('/Users/:Username', passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
            $set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
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

//Allow users to add a movie to the list
app.post('/Users/:Username/Movies/:_id', passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { Favorites: req.params._id }
    },
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
app.delete('/Users/:Username/Movies/:_id', passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $pull: { Favorites: req.params._id } },
        { new: true },
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
app.delete('/Users/:Username', passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
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

//This is an error-handling middleware function that will log all application-level errors to the terminal.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Open port 8080 which enables us to send and recieve through the server
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});
