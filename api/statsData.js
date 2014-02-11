var videos = require('./videosData'),
  problems = require('./problemsData');

var counts = {
  videosCount: videos.getAll().length,
  problemsCount: problems.getAll().length,
  unsolvedCount: 2,
  solvedCount: 0
};

exports.getCounts = function() {
  return counts;
};
