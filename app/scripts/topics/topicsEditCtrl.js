angular
.module('app.topics')
.controller('TopicsEditCtrl',function($scope,topic,save,videos){
  $scope.topic = topic;

  $scope.save = function(topic){
    save(topic);
  };

  if(videos){
    if(angular.isArray(videos)){
      $scope.videos = videos;
    }
    else{
      videos.all().then(function(data){
        $scope.videos = data;
      });
    }
  }

  $scope.removeVideo = function(topic,video){
    topic.videos = topic.videos.filter(function(vid){
      return vid.id!==video.id;
    });
  };
  
  $scope.addVideo = function(topic,video){
    if(!topic.videos)
    {
      topic.videos = [video];
      return;
    }
    if(topic.videos.some(function(vid){
        return vid.id===video.id;
      })){
      return;
    }
    topic.videos.push(video);
  };
});