/* global videojs*/
angular.module('app.homePages', ['app.config', 'ngResource', 'angularSpinkit', 'btford.modal']).

  factory('videos',function(API_BASE, $resource) {
    var res = $resource(API_BASE + '/videos');
    return {
      all: function() {
        return res.query().$promise;
      }
    };
  }).

  factory('videoModal',function(btfModal, TPL_PATH) {
    return btfModal({
      controller: 'VideoModalCtrl',
      templateUrl: TPL_PATH + '/video-modal.html'
    });
  }).

  controller('VideoModalCtrl',function($scope, videoModal) {
    $scope.isYouTube = ($scope.url.indexOf('www.youtube.com/watch') > -1);

    $scope.closeMe = function() {
      // TODO: Make this a directive
      videojs('edu-video').dispose();
      videoModal.deactivate();
    };

    $scope.dataSetup = function() {
      if (this.isYouTube) {
        return '{ "techOrder": ["youtube"], "src": "' + this.url + '" }';
      }
      return '{}';
    };
  }).

  controller('HomeCtrl', function($scope, videos, videoModal) {
    $scope.showModal = function(video) {
      videoModal.activate(video);
    };
    $scope.videos = null;

    videos.all().then(function(data) {
      $scope.videos = data;
    });

  });
