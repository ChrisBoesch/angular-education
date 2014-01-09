angular.module('app.homePages', ['app.config', 'ngResource', 'angularSpinkit']).

  factory('videos',function(API_BASE, $resource) {
    var res = $resource(API_BASE + '/videos');
    return {
      all: function() {
        return res.query().$promise;
      }
    };
  }).

  directive('videoJs',function() {
    var linker = function(scope, element, attrs) {
      attrs.type = attrs.type || 'video/mp4';

      var setup = {
        'techOrder': ['html5', 'flash'],
        'controls': true,
        'preload': 'auto',
        'autoplay': false,
        'height': 'auto',
        'width': 'auto'
      };

      attrs.id = 'video-js' + id;
      element.attr('id', attrs.id);
      // element.attr('poster', 'http://10.1.21.36:8080/Testube/media/' + videoid + '.jpg');
      var player = _V_(attrs.id, setup, function() {
        var source = ([
          {type: 'video/mp4', src: 'http://testube:8080/Testube/media/' + videoid + '.mp4'}
        ]);
        this.src({type: attrs.type, src: source });
      });
    };
    return {
      restrict: 'A',
      link: linker
    };
  }).

  controller('HomeCtrl',function($scope, videos) {
    $scope.videos = null;

    videos.all().then(function(data) {
      $scope.videos = data;
    });
  }).

  controller('ProblemCtrl', function($scope) {
    $scope.problem = null;
  })
;
