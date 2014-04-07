angular
.module('app.topics')
.controller('TopicsEditCtrl',function($scope,topic,save){
  $scope.topic = topic;

  $scope.save = function(topic){
    save(topic);
  };
});