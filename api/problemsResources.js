var swagger = require('swagger-node-express'),
  params = swagger.params,
  swe = swagger.errors;

var problemsData = require('./problemsData.js');

function writeResponse(res, data) {
  swagger.setHeaders(res);
  res.send(JSON.stringify(data));
}

// the description will be picked up in the resource listing
exports.findAll = {
  spec: {
    description: 'Operations about problems',
    path: '/problems',
    method: 'GET',
    summary: 'Find all problems',
    notes: 'Returns all problems',
    type: 'array',
    items: {
      $ref: 'Problems'
    },
    nickname: 'getAllProblems',
    produces: ['application/json'],
    responseMessages: [swe.notFound('problems')]
  },
  action: function(req, res) {
    var problems = problemsData.getAll();

    if (problems) {
      writeResponse(res, problems);
    }
    else {
      throw swe.notFound('problems');
    }
  }
};

exports.findById = {
  spec: {
    description: 'Operations about problems',
    path: '/problems/{problemId}',
    method: 'GET',
    summary: 'Find problem by ID',
    notes: 'Returns a problem based on ID',
    type: 'Problem',
    nickname: 'getProblemById',
    produces: ['application/json'],
    parameters: [params.path('problemId', 'ID of problem that needs to be fetched', 'string')],
    responseMessages: [swe.invalid('id'), swe.notFound('problem')]
  },
  action: function(req, res) {
    if (!req.params.problemId) {
      throw swe.invalid('id');
    }
    var id = parseInt(req.params.problemId);
    var problem = problemsData.getById(id);

    if (problem) {
      writeResponse(res, problem);
    }
    else {
      throw swe.notFound('problem');
    }
  }
};

