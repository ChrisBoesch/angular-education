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
      controllerAs: 'modal',
      templateUrl: TPL_PATH + '/video-modal.html'
    });
  }).

  controller('VideoModalCtrl',function(videoModal) {
    this.closeMe = videoModal.deactivate;
  }).

  controller('HomeCtrl', function($scope, videos, videoModal) {
    $scope.showModal = videoModal.activate;

    $scope.videos = null;
    videos.all().then(function(data) {
      $scope.videos = data;
    });

  });
