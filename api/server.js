var express = require('express'),
  app = express();

// Simulate slow network with a delay
var DELAY = process.env.DELAY || 0;

// One second delay
DELAY = 1000;

// Global Data

var videos = [
  {
    id: 1,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4'
  },
  {
    id: 2,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY'
  },
  {
    id: 3,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4'
  },
  {
    id: 4,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY'
  },
  {
    id: 5,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4'
  },
  {
    id: 6,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY'
  },
  {
    id: 7,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4'
  },
  {
    id: 8,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY'
  },
  {
    id: 9,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4'
  },
  {
    id: 10,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY'
  }
];

app.get('/', function(req, res) {
  res.send('welcome to fake api provider');
});

app.get('/videos', function(req, res) {
  setTimeout(function() {
    res.send(videos);
  }, DELAY);
});

app.get('/videos/:id', function(req, res) {
  setTimeout(function() {
    res.send(videos[req.params.id - 1]);
  }, DELAY);
});

app.get('/stats', function(req, res) {
  setTimeout(function() {
    res.send({problemsCount: 10, unsolvedCount: 7, solvedCount: 3});
  }, DELAY);
});

app.listen(9090);

console.log('Listening on port 9090');
