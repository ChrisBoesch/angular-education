var swagger = require('swagger-node-express'),
  swe = swagger.errors;

var statsData = require('./statsData');

function writeResponse(res, data) {
  swagger.setHeaders(res);
  res.send(JSON.stringify(data));
}

// the description will be picked up in the resource listing
exports.getStats = {
  spec: {
    description: 'Operations about stats',
    path: '/stats',
    method: 'GET',
    summary: 'Find all the stats of current user',
    notes: 'Returns all the stats of current user',
    type: 'Counts',
    nickname: 'getStats',
    produces: ['application/json'],
    responseMessages: [swe.notFound('stats')]
  },
  action: function(req, res) {
    var counts = statsData.getCounts();

    if (counts) {
      writeResponse(res, counts);
    }
    else {
      throw swe.notFound('stats');
    }
  }
};
