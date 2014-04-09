var _ = require('lodash');
var videos = require('./videosData');

var topics = [{
  id: 1,
  title: 'Basics of JavaScript',
  description: 'Basics of the awesome JavaScript programming language',
  videosRef:[1,3,5]
},
{
  id: 2,
  title: 'Functional JavaScript',
  description: 'Introduction to FL paradigm',
  videosRef:[2,1,3,7]
}
];

exports.getAll = function(){
  return topics;
};


exports.getById =  function(id) {
  var topic = _(topics).chain()
  .filter({id:id})
  .map(function(_topic){
    var vids =
    _.map(_topic.videosRef,videos.getById);
    return _.extend(_topic,{videos: vids});
  })
  .first()
  .pick(['id','title','description','videos'])
  .value();
  return topic;
};

exports.add = function(topic){
  if(!topic || !topic.title){
    return;
  }
  topic.id = topics.length+1;
  topics.push(topic);

  return topic;
};

exports.update = function(topic){
  if(!topic || !topic.id || !topic.title){
    return;
  }
  topic.videosRef =
  _(topic.videos)
  .pluck("id")
  .uniq()
  .value();
  
  var topicId = _.findIndex(topics,{id:topic.id});
  if(topicId===-1){
    throw new Error('topic not found by id:'+ topic.id);
  }

  _.assign(topics[topicId],
    _.pick(topic,['id','title','description','videosRef']));

  return topics[topicId];
};