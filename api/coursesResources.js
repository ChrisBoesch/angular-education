var swagger = require('swagger-node-express'),
  params = swagger.params,
  swe = swagger.errors;

var coursesData = require('./coursesData.js');

function writeResponse(res, data) {
  swagger.setHeaders(res);
  res.send(JSON.stringify(data));
}

// the description will be picked up in the resource listing
exports.findAll = {
  spec: {
    description: 'Operations about courses',
    path: '/courses',
    method: 'GET',
    summary: 'Find all courses',
    notes: 'Returns all courses',
    type: 'array',
    items: {
      $ref: 'course'
    },
    nickname: 'getAllcourses',
    produces: ['application/json'],
    parameters: [params.query('problemId', 'Option search criteria', 'integer')],
    responseMessages: [swe.notFound('courses')]
  },
  action: function(req, res) {
    var courses, course;

    if (req.query && req.query.problemId) {
      course = coursesData.getByProblemId(parseInt(req.query.problemId, 10));
      courses = course ? [course] : [];
    } else {
      courses = coursesData.getAll();
    }

    if (courses) {
      writeResponse(res, courses);
    }
    else {
      throw swe.notFound('courses');
    }
  }
};

exports.findById = {
  spec: {
    description: 'Operations about courses',
    path: '/courses/{courseId}',
    method: 'GET',
    summary: 'Find course by ID',
    notes: 'Returns a course based on ID',
    type: 'course',
    nickname: 'getcourseById',
    produces: ['application/json'],
    parameters: [params.path('courseId', 'ID of course that needs to be fetched', 'integer')],
    responseMessages: [swe.invalid('id'), swe.notFound('course')]
  },
  action: function(req, res) {
    if (!req.params.courseId) {
      throw swe.invalid('id');
    }
    var id = parseInt(req.params.courseId, 10);
    var course = coursesData.getById(id);

    if (course) {
      writeResponse(res, course);
    }
    else {
      throw swe.notFound('course');
    }
  }
};

exports.create = {
  spec: {
    description: 'Create course entry',
    path: '/courses',
    method: 'POST',
    summary: 'Create new course entry',
    type: 'course',
    nickname: 'createcourse',
    produces: ['application/json'],
    parameters: [
      params.body('data', 'Expected JSON Payload', 'course')
    ],
    responseMessages: [
      swe.invalid('payload')
    ]
  },
  action: function(req, res) {
    var courseReq = req.body;
    var course;
    if(!courseReq.id){
      course = coursesData.add(courseReq);
    }
    else{
      course = coursesData.update(courseReq);
    }
    if(course)
    {
      writeResponse(res,course);
    }
    else{
      throw swe.invalid('course');
    }

  }
};
