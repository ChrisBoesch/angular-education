var _ = require('lodash');

var topics = [{
  id: 1,
  title: 'Basics of JavaScript',
  description: 'Basics of the awesome JavaScript programming language',
},
{
  id: 2,
  title: 'Functional JavaScript',
  description: 'Introduction to FL paradigm',
}
];

exports.getAll = function(){
  return topics;
};

exports.getById = function(id) {
  return _.find(topics, {id: id});
};

exports.add = function(topic){
  if(!topic || !topic.title){
    return;
  }
  topic.id = topics.length+1;
  topics.push(topic);

  return topic;
};