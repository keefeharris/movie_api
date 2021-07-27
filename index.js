const express = require('express');
//the module for express is called
const app = express();
//the module express is encapsulated 
const morgan = require('morgan');
//the module for morgan is called
const uuid = require('uuid');
//the module for uuid is called
const bodyParser = require('body-parser');
//the module for body-parser is called


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

function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}

let movies = [
    {
        title: "The Shawshank Redemption",
        genre: "drama",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
        title: "The Godfather",
        genre: "crime",
        description: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son."
    },
    {
        title: "The Godfather: Part 2",
        genre: "crime",
        description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate."
    },
    {
        title: "The Dark Knight",
        genre: "action",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        title: "Angry Men",
        genre: "crime",
        description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence."
    },
    {
        title: "Schindler's List",
        genre: "biography",
        description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis"
    },
    {
        title: "The Lord Of The Rings: The Return Of The King",
        genre: "adventure",
        description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring."
    },
    {
        title: "PulpFiction",
        genre: "Drama",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
        title: "The Good, The Bad And The Ugly",
        genre: "western",
        description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery."
    },
    {
        title: "The Lord Of The Rings: The Fellowship Of The Rings",
        genre: "adventure",
        description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron"
    }
];

let genres = [
    {
        name: "Action",
        description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases."
    },
    {
        name: "Crime",
        description: "Crime fiction is the literary genre that fictionalises crimes, their detection, criminals and their motives"
    },
    {
        name: "Drama",
        description: "The drama genre is strongly based in a character, or characters, that are in conflict at a crucial moment in their lives. Most dramas revolve around families and often have tragic or painful resolutions."
    },
    {
        name: "Adventure",
        description: " An adventure is an event or series of events that happens outside the course of the protagonists ordinary life, usually accompanied by danger, often by physical action."
    },
    {
        name: "Western",
        description: "Western is a genre of fiction set primarily in the latter half of the 19th and early 20th century in the Western United States, which is styled the 'Old West'."
    }
]

let directors = [
    {
        name: "Frank Darabont",
        birthYear: "January 28, 1959",
        bio: "Frank Árpád Darabont is a French-American film director, screenwriter and producer of Hungarian descent. He has been nominated for three Academy Awards and a Golden Globe Award.",
        movie: ""
    },
    {
        name: "Francis Ford Coppola",
        birthYear: "April 7, 1939",
        bio: "Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family.",
        movie: ""
    },
    {
        name: "Christopher Nolan",
        birthYear: "July 30, 1970",
        bio: "Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
        movie: ""
    },
    {
        name: "Sidney Lumet",
        birthYear: " June 25, 1924",
        bio: "Sidney Arthur Lumet was an American film director, producer, and screenwriter with over 50 films to his credit.",
        movie: ""
    },
    {
        name: "Steven Spielberg",
        birthYear: "December 18, 1946",
        bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
        movie: ""
    },
    {
        name: "Peter Jackson",
        birthYear: " October 31, 1961",
        bio: "Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, producer, and screenwriter. He is best known as the director, writer, and producer.",
        movie: ""
    },
    {
        name: "Quentin Tarantino",
        birthYear: " March 27, 1963",
        bio: "Quentin Jerome Tarantino is an American film director, screenwriter, producer, author, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.",
        movie: ""
    },
    {
        name: "Sergio Leone",
        birthYear: "January 3, 1929",
        bio: "Sergio Leone was an Italian film director, producer and screenwriter, credited as the creator of the Spaghetti Western genre and widely regarded as one of the most influential directors in the history of cinema.",
        movie: ""
    }
];

let users = [ 
    {
        username: "keefe",
        password: "adshjk",
        movieList: "thor",
        id: "1"
    },
    {
        username: "jin",
        password: "kazama",
        movieList: "tekken",
        id: "2"
    },
    {
        username: "sosuke",
        password: "aizen",
        movieList: "bleach",
        id: "3"
    }
];

//Return a greeting message to test server
app.get('/', (req, res) => {
  res.send('Welcome to Movie REST API!');
});

//Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
  res.json(movies);
});

//Return a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    const _title = req.params.title
    movies.forEach((movie) => {
        if (movie.title === capitalizeTheFirstLetterOfEachWord(_title)) {
            res.json(movie);
        } 
    })
    return res.status(404).send("Movie not found.");
});

//return a single genre by name to user
app.get('/genres/:name', (req, res) => {
    const _gname = req.params.name
    genres.forEach((genre_name) => {
        if (genre_name.name === capitalizeTheFirstLetterOfEachWord(_gname)) {
            res.json(genre_name);
        }
    })
    return res.status(404).send("Genre not found.");
});

//Return a single director by name to user
app.get('/directors/:name', (req, res) => {
    const _name = req.params.name
    directors.forEach((director) => {
        if (director.name === capitalizeTheFirstLetterOfEachWord(_name)) {
            res.json(director);
        }
    })
    return res.status(404).send("Director not found.");
});

//Allow new users to register
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

//Allow users to update information
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

//Allow users to add a movie to the list
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

//Allow user to remove a movie from the list
app.delete('/users/:movieList', (req, res) => {
    res.send('User movie has been deleted.')
})

//Allow user to deregister
app.delete('/users/:username', (req, res) => {
    res.send('User has been deleted.')
})

//Open port 8080 which enables us to send and recieve through the server
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
