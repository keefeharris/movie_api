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

let movie = [
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
        title: "Pulp Fiction",
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

let director = [
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

app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

app.get('/movie', (req, res) => {
  res.json(movie);
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});