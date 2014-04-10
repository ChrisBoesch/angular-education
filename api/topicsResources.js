var swagger = require('swagger-node-express'),
  params = swagger.params,
  swe = swagger.errors;

var topicsData = require('./topicsData.js');

function writeResponse(res, data) {
  swagger.setHeaders(res);
  res.send(JSON.stringify(data));
}

// the description will be picked up in the resource listing
exports.findAll = {
  spec: {
    description: 'Operations about topics',
    path: '/topics',
    method: 'GET',
    summary: 'Find all topics',
    notes: 'Returns all topics',
    type: 'array',
    items: {
      $ref: 'Topic'
    },
    nickname: 'getAlltopics',
    produces: ['application/json'],
    parameters: [params.query('problemId', 'Option search criteria', 'integer')],
    responseMessages: [swe.notFound('topics')]
  },
  action: function(req, res) {
    var topics, topic;

    if (req.query && req.query.problemId) {
      topic = topicsData.getByProblemId(parseInt(req.query.problemId, 10));
      topics = topic ? [topic] : [];
    } else {
      topics = topicsData.getAll();
    }

    if (topics) {
      writeResponse(res, topics);
    }
    else {
      throw swe.notFound('topics');
    }
  }
};

exports.findById = {
  spec: {
    description: 'Operations about topics',
    path: '/topics/{topicId}',
    method: 'GET',
    summary: 'Find topic by ID',
    notes: 'Returns a topic based on ID',
    type: 'topic',
    nickname: 'gettopicById',
    produces: ['application/json'],
    parameters: [params.path('topicId', 'ID of topic that needs to be fetched', 'integer')],
    responseMessages: [swe.invalid('id'), swe.notFound('topic')]
  },
  action: function(req, res) {
    if (!req.params.topicId) {
      throw swe.invalid('id');
    }
    var id = parseInt(req.params.topicId, 10);
    var topic = topicsData.getById(id);

    if (topic) {
      writeResponse(res, topic);
    }
    else {
      throw swe.notFound('topic');
    }
  }
};

exports.create = {
  spec: {
    description: 'Create topic entry',
    path: '/topics',
    method: 'POST',
    summary: 'Create new topic entry',
    type: 'topic',
    nickname: 'createtopic',
    produces: ['application/json'],
    parameters: [
      params.body('data', 'Expected JSON Payload', 'topic')
    ],
    responseMessages: [
      swe.invalid('payload')
    ]
  },
  action: function(req, res) {
    var topic = topicsData.add(req.body);

    if(topic)
    {
      writeResponse(res,topic);
    }
    else{
      throw swe.invalid('topic');
    }

  }
};

exports.update = {
  spec: {
    description: 'Update a topic entry',
    path: '/topics/{topicId}',
    method: 'PUT',
    summary: 'Update an existing topic entry',
    type: 'topic',
    nickname: 'updateTopic',
    produces: ['application/json'],
    parameters: [
      params.body('data', 'Expected JSON Payload', 'topic')
    ],
    responseMessages: [
      swe.invalid('payload')
    ]
  },
  action: function(req, res) {
    var topicReq = req.body;
    var topicId;
    var topic;

    if (!req.params.topicId) {
      throw swe.invalid('id');
    }

    topicId = parseInt(req.params.topicId, 10);
    topic = topicsData.update(topicId, topicReq);

    if(topic)
    {
      writeResponse(res,topic);
    }
    else{
      throw swe.invalid('topic');
    }

  }
};
