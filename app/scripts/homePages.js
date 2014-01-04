angular.module('app.homePages', ['ngResource', 'ngAnimate'])

  .factory('welcomeMessage', function() {
    return function() {
      return 'Welcome Home...';
    };
  })

  .factory('videos', function(API_BASE, $resource) {
    var res = $resource(API_BASE + '/videos');
    return {
      all: function() {
        return res.query().$promise;
      }
    };
  })

  .directive('spinner', function(TPL_PATH) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: TPL_PATH + '/spinner.html',
      link: function(scope, element) {
        $(element).find('.spinner').spin();

        var unbind = scope.$watch('data', function(newVal) {
          if (newVal) {
            element.remove();
            // unbind the watch
            unbind();
          }
        });
      }
    };
  })

  .controller('HomeCtrl', function($scope, videos) {
    $scope.videos = null;
    videos.all().then(function(data) {
      $scope.videos = data;
    });

  });
