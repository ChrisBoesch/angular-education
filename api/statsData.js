var videos = require('./videosData'),
  problems = require('./problemsData');

var counts = {
  videosCount: videos.getAll().length,
  problemsCount: problems.getAll().length,
  unsolvedCount: problems
  	.getAll()
  	.filter(function(problem){ return !problem.solved})
  	.length,
  solvedCount: problems
  	.getAll()
  	.filter(function(problem){ return problem.solved})
  	.length,
};

exports.getCounts = function() {
  return counts;
};
