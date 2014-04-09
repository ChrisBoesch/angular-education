angular
.module('app.topics')
.controller('VideoAssociationCtrl',function($scope,videos){
  //TODO: should not show already added
  videos.all().then(function(data){
    $scope.list = data;
  });

  //todo: add back to available videos
  $scope.removeVideo = function(topic,video){
    topic.videos = topic.videos.filter(function(vid){
      return vid.id!==video.id;
    });
  };
  
  //todo: remove added from list
  $scope.addVideo = function(topic,video){
    topic.videos.push(video);
  };
});