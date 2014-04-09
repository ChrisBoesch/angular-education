angular
.module('app.topics')
.controller('VideoAssociationCtrl',function($scope,videos){
  videos.all().then(function(data){
    $scope.list = data;
  });

  $scope.removeVideo = function(topic,video){
    topic.videos = topic.videos.filter(function(vid){
      debugger;
      return vid.id!=video.id;
    });
  };
  $scope.addVideo = function(topic,video){
    topic.videos.push(video);
  };
});