var _ = require('lodash');

var videos = [
  {
    id: 1,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    isWatched: true,
    problemId: 1
  },
  {
    id: 2,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    isWatched: false,
    problemId: 2
  },
  {
    id: 3,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    isWatched: false
  },
  {
    id: 4,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    isWatched: true
  },
  {
    id: 5,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    isWatched: false
  },
  {
    id: 6,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    isWatched: false
  },
  {
    id: 7,
    title: 'Introduction to JavaScript',
    description: 'Basics of the awesome JavaScript programming language',
    thumbnail: null,
    url: 'http://vjs.zencdn.net/v/oceans.mp4',
    isWatched: true
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
    isWatched: false
  },
  {
    id: 10,
    title: 'Egghead.io - Bower - Intro to Bower',
    description: 'More great videos at http://egghead.io',
    thumbnail: 'http://i1.ytimg.com/vi/vO_Ie3kMXbY/mqdefault.jpg',
    url: 'http://www.youtube.com/watch?v=vO_Ie3kMXbY',
    isWatched: false
  }
];

exports.getAll = function() {
  return videos;
};

exports.getById = function(id) {
  return _.find(videos, {id: id});
};

exports.getByProblemId = function(problemId) {
  return _.find(videos, {problemId: problemId});
};

exports.add = function(video){
  if(!video || !video.title || !video.url){
    return;
  }
  video.id = videos.length+1;
  videos.push(video);

  return video;
};