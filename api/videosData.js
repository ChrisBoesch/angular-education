var _ = require('lodash');

var videos = [
  {
    id: 1,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    watched: true
  },
  {
    id: 2,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    watched: false
  },
  {
    id: 3,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    watched: false
  },
  {
    id: 4,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    watched: true
  },
  {
    id: 5,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    watched: false
  },
  {
    id: 6,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    watched: false
  },
  {
    id: 7,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    watched: true
  },
  {
    id: 8,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    watched: false
  },
  {
    id: 9,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    watched: false
  },
  {
    id: 10,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    watched: false
  }
];

exports.getAll = function() {
  return videos;
};

exports.getById = function(id) {
  return _.find(videos, {id: id});
};
