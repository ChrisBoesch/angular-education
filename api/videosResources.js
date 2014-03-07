var swagger = require('swagger-node-express'),
  params = swagger.params,
  swe = swagger.errors;

var videosData = require('./videosData.js');

function writeResponse(res, data) {
  swagger.setHeaders(res);
  res.send(JSON.stringify(data));
}

// the description will be picked up in the resource listing
exports.findAll = {
  spec: {
    description: 'Operations about videos',
    path: '/videos',
    method: 'GET',
    summary: 'Find all videos',
    notes: 'Returns all videos',
    type: 'array',
    items: {
      $ref: 'Video'
    },
    nickname: 'getAllVideos',
    produces: ['application/json'],
    responseMessages: [swe.notFound('videos')]
  },
  action: function(req, res) {
    var videos = videosData.getAll();

    if (videos) {
      writeResponse(res, videos);
    }
    else {
      throw swe.notFound('videos');
    }
  }
};

exports.findById = {
  spec: {
    description: 'Operations about videos',
    path: '/videos/{videoId}',
    method: 'GET',
    summary: 'Find video by ID',
    notes: 'Returns a video based on ID',
    type: 'Video',
    nickname: 'getVideoById',
    produces: ['application/json'],
    parameters: [params.path('videoId', 'ID of video that needs to be fetched', 'integer')],
    responseMessages: [swe.invalid('id'), swe.notFound('video')]
  },
  action: function(req, res) {
    if (!req.params.videoId) {
      throw swe.invalid('id');
    }
    var id = parseInt(req.params.videoId);
    var video = videosData.getById(id);

    if (video) {
      writeResponse(res, video);
    }
    else {
      throw swe.notFound('video');
    }
  }
};

exports.create = {
  spec: {
    description: 'Create video entry',
    path: '/videos',
    method: 'POST',
    summary: 'Create new video entry',
    type: 'Video',
    nickname: 'createVideo',
    produces: ['application/json'],
    parameters: [
        params.body('data', 'Expected JSON Payload', 'Video')
    ],
    responseMessages: [
      swe.invalid('payload')
    ]
  },
  action: function(req, res) {
    writeResponse(res,{status:"ok"});
  }
};