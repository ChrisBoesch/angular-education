var _ = require('lodash');
var topics = require('./topicsData');

var courses = [{
  id: 1,
  title: 'Introduction to JavaScript',
  description: 'Basic toppics of Javascript language: syntax overview, jquery, scopes etc.',
  topicsRef:[1,2]
},
{
  id: 2,
  title: 'Introduction to Python',
  description: 'Basic toppics of Javascript language: syntax overview, jquery, scopes etc.',
  topicsRef:[3,4,5]
}
];

exports.getAll = function(){
  return courses;
};

exports.getById = function(id) {
  var course = _(courses).chain()
  .filter({id:id})
  .map(function(_course){
    var _topics =
      _.map(_course.topicsRef,topics.getById);
    return _.extend(_course,{topics: _topics});
  })
  .first()
  .pick(['id','title','description','topics'])
  .value();
  return course;
};

exports.add = function(course){
  if(!course || !course.title){
    return;
  }
  course.id = courses.length+1;
  courses.push(course);

  return course;
};

exports.update = function(course){
  if(!course || !course.id || !course.title){
    return;
  }
  
  var courseId = _.findIndex(courses,{id:course.id});
  if(courseId===-1){
    throw new Error('course not found by id:'+ course.id);
  }
  _.assign(courses[courseId],
    _.pick(course,['id','title','description']));

  return courses[courseId];
};