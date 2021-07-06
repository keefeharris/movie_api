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

let user = [];

let director = [];

let movie = [
  {
      title: 'Thor: The Dark World',
      director: {
          name: 'Alan Taylor',
          birthyear: 'January 13, 1959',
          bio: "Alan Taylor is an American television and film director."     
      },
      description: "When the Dark Elves attempt to plunge the universe into darkness, Thor must embark on a perilous and personal journey that will reunite him with doctor Jane Foster."
  },
  {
      title: 'The Incredible Hulk',
      director: {
          name: 'Louis Leterrier',
          birthyear: 'June 17, 1973',
          bio: "Louis Leterrier is a French film director whose films include the first two Transporter films, Unleashed and The Incredible Hulk."     
      },
      description: "The Incredible Hulk tells the story of Dr Bruce Banner, who seeks a cure to his unique condition, which causes him to turn into a giant green monster under emotional stress."
  },
  {
      title: 'Iron Man 2',
      director: {
          name: 'Jon Favreau',
          birthyear: 'October 19, 1966',
          bio: "Jonathan Kolia Favreau is an American actor, director, producer and screenwriter."     
      },
      description: "After Tony Stark announces to the World that he's Iron Man. He faces many problems in his Life, His Lifesource is Poisoning him, The US Government wants his tech, and someone's out to kill Stark."
  },
  {
      title: 'Avengers: Age of Ultron',
      director: {
          name: 'Joss Whedon',
          birthyear: 'June 23, 1964',
          bio: "Joseph Hill Whedon is an American film and television director, producer, screenwriter, and composer."     
      },
      description: "Tony Stark creates the Ultron Program to protect the world, but when the peacekeeping program becomes hostile, The Avengers go into action to try and defeat a virtually impossible enemy together."
  },
  {
      title: 'Thor',
      director: {
          name: 'Kenneth Branagh',
          birthyear: 'December 10, 1960',
          bio: "Kenneth Charles Branagh is a British actor and filmmaker."     
      },
      description: "After reigniting a dormant war, Thor is banished from Asgard to Earth, stripped of his powers and his hammer Mjölnir. As his brother Loki plots to take the Asgardian throne, Thor must prove himself worthy."
  },
  {
      title: 'Captian Marvel',
      director: {
          name: 'Anna Boden',
          birthyear: 'October 20, 1979',
          bio: "Anna Boden is an American filmmaker."     
      },
      description: "Captain Marvel is a 2019 American superhero film based on Marvel Comics featuring the character Carol Danvers / Captain Marvel."
  },
  {
      title: 'Iron Man 3',
      director: {
          name: 'Shane Black',
          birthyear: 'December 16, 1961',
          bio: "Shane Black is an American film director, producer, screenwriter and actor."     
      },
      description: "Marvel's Iron Man 3 pits brash-but-brilliant industrialist Tony Stark/Iron Man against an enemy whose reach knows no bounds."
  },
  {
      title: 'Captain America: The First Avenger',
      director: {
          name: 'Joe Johnston',
          birthyear: 'May 13, 1950',
          bio: "Joseph Eggleston Johnston II is an American film director, writer, and visual effects artist best known for such effects-driven films as Honey, I Shrunk the Kids, Jumanji, and Jurassic Park III."     
      },
      description: "During World War II, Steve Rogers, a frail man, is transformed into the super-soldier Captain America and must stop the Red Skull from using the Tesseract as an energy source for world domination."
  },
  {
      title: 'Ant Man',
      director: {
          name: 'Peyton Reed',
          birthyear: 'July 3, 1964',
          bio: "Peyton Tucker Reed is an American television and film director."     
      },
      description: "Armed with the astonishing ability to shrink in scale but increase in strength, con-man Scott Lang must embrace his inner-hero and help his mentor, Dr. Hank Pym, protect the secret behind his spectacular Ant-Man suit from a new generation of towering threats."
  },
  {
      title: 'Guardians of the Galaxy Vol.2',
      director: {
          name: 'James Gunn',
          birthyear: 'August 5, 1970',
          bio: "James Francis Gunn Jr. is an American film director, actor, producer, and screenwriter."     
      },
      description: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego."
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