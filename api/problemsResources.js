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

exports.createNewProblem = {
  spec: {
    description: 'Operations about problems',
    path: '/problems',
    method: 'POST',
    summary: 'Add a new problem',
    notes: 'Returns a new problems',
    type: 'Problem',
    nickname: 'createNewProblem',
    produces: ['application/json'],
    parameters: [params.body('data', 'Expected JSON Payload', 'Problem')],
    responseMessages: [swe.invalid('problem')]
  },
  action: function(req, res) {
    var problem = problemsData.add(req.body);

    if (problem) {
      writeResponse(res, problem);
    } else {
      throw swe.invalid('problem');
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
    parameters: [params.path('problemId', 'ID of problem that needs to be fetched', 'integer')],
    responseMessages: [swe.invalid('id'), swe.notFound('problem')]
  },
  action: function(req, res) {
    if (!req.params.problemId) {
      throw swe.invalid('id');
    }
    var id = parseInt(req.params.problemId, 10);
    var problem = problemsData.getById(id);

    if (problem) {
      writeResponse(res, problem);
    }
    else {
      throw swe.notFound('problem');
    }
  }
};

exports.addQuestion = {
  spec: {
    description: 'Operations about a problem questions',
    path: '/problems/{problemId}/questions',
    method: 'POST',
    summary: 'Add a question to a problem',
    notes: 'Returns a question and its ID',
    type: 'Question',
    nickname: 'addQuestion',
    produces: ['application/json'],
    parameters: [
      params.path('problemId', 'ID of problem that needs to be fetched', 'integer'),
      params.body('data', 'Expected JSON Payload', 'QuestionDefinition')
    ],
    responseMessages: [swe.invalid('id'), swe.notFound('problem')]
  },
  action: function(req, res) {
    var id, problem, question;

    if (!req.params.problemId) {
      throw swe.invalid('id');
    }

    id = parseInt(req.params.problemId, 10);
    problem = problemsData.getById(id);

    if (!problem) {
      throw swe.notFound('problem');
    }

    question = problemsData.addQuestion(problem, req.body);
    if (question) {
      writeResponse(res, question);
    } else {
      throw swe.invalid('question');
    }

  }
};

exports.postAnswer = {
  spec: {
    description: 'Operations about problems',
    path: '/problems/{problemId}/questions/{questionId}/answer',
    method: 'POST',
    summary: 'Answer to the question',
    notes: 'Returns if the answer is true or false',
    type: 'Answer',
    nickname: 'postAnswer',
    parameters: [
      params.path('problemId', 'ID of problem that needs to be fetched', 'integer'),
      params.path('questionId', 'ID of question that needs to be fetched', 'integer'),
      params.body('data', 'Expected JSON Payload', 'AnswerPayload')
    ],
    responseMessages: [
      swe.invalid('id'),
      swe.invalid('payload'),
      swe.notFound('question')
    ]
  },
  action: function(req, res) {
    if (!req.params.questionId) {
      throw swe.invalid('id');
    }

    var body = req.body;
    if (!body || !body.answer) {
      throw swe.invalid('payload');
    }
    else {
      var id = parseInt(req.params.questionId, 10);
      var answer = parseInt(body.answer, 10);
      var answerObj = problemsData.postAnswer(id, answer);

      if (answerObj) {
        writeResponse(res, answerObj);
      }
      else {
        throw swe.notFound('problem');
      }
    }
  }
};

