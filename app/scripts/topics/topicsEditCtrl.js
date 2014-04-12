angular
  .module('app.topics')
  .controller('TopicsEditCtrl', function($scope, $q, $log, topic, save, videos) {
    $scope.topic = topic;
    $scope.authError = false;

    $scope.save = function(topic) {
      $scope.authError = false;

      return save(topic).catch(function(resp){
        if (resp.status === 401 || resp.status === 403) {
          $scope.authError = true;
        } else {
          $log.error(resp);
        }

        return $q.reject(resp);
      });
    };

    if (videos) {
      if (angular.isArray(videos)) {
        $scope.videos = videos;
      } else {
        videos.all().then(function(data) {
          $scope.videos = data;
        });
      }
    }

    $scope.removeVideo = function(topic, video) {
      topic.videos = topic.videos.filter(function(vid) {
        return vid.id !== video.id;
      });
    };

    $scope.addVideo = function(topic, video) {
      if (!topic.videos) {
        topic.videos = [video];
        return;
      }
      if (topic.videos.some(function(vid) {
        return vid.id === video.id;
      })) {
        return;
      }
      topic.videos.push(video);
    };
  });