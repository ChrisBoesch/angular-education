/*global videojs, _*/
angular.module('app.homePages', ['app.config', 'ngResource', 'angularSpinkit'])

  .factory('videos', function(API_BASE, $resource) {
    var res = $resource(API_BASE + '/videos/:id');
    return {
      all: function() {
        return res.query().$promise;
      },
      getById: function(id) {
        return res.get({id: id}).$promise;
      }
    };
  })

  .directive('videoJs', function() {
    var linker = function(scope, element, attrs) {
      var player;

      var guard = scope.$watch('url', function(url) {
        if (!url) {
          return;
        }

        var setup,
          isYouTube = url.indexOf('www.youtube.com/watch?') > -1;

        // YouTube
        if (isYouTube) {
          setup = {
            techOrder: ['youtube'],
            src: url,
            controls: true,
            preload: 'auto',
            autoplay: false,
            ytcontrols: false,
            width: '100%',
            height: 0
          };
        } else {
          setup = {
            techOrder: ['html5'],
            controls: true,
            preload: 'auto',
            autoplay: false,
            width: 'auto',
            height: 'auto'
          };
          attrs.type = attrs.type || 'video/mp4';
        }

        attrs.id = 'video-js' + scope.id;
        element.attr('id', attrs.id);
        // element.attr('poster', 'thumb');

        player = videojs(attrs.id, setup).ready(function() {
          if (!isYouTube) {
            var source = ([
              {type: 'video/mp4', src: url}
            ]);
            this.src({type: attrs.type, src: source });

            // Store the video object
            var myPlayer = this;
            // Make up an aspect ratio
            var aspectRatio = 9 / 16;

            function resizeVideoJS() {
              // Get the parent element's actual width
              var width = element.parent().parent().width();

              // Set width to fill parent element, Set height
              myPlayer.width(width).height(width * aspectRatio);
            }

            // Initialize the function
            resizeVideoJS();

            // Call the function on resize
            $(window).on('resize', _.debounce(function() {
              resizeVideoJS();
            }, 50));
          }
        });

        // remove the watch
        guard();
      });

      scope.$on('$destroy', function() {
        player.dispose();
      });
    };
    return {
      restrict: 'A',
      link: linker
    };
  })

  .controller('HomeCtrl', function($scope, videos) {
    $scope.videos = null;

    videos.all().then(function(res) {
      $scope.videos = res;
    });
  })

  .controller('VideoCtrl', function($scope, $routeParams, videos) {
    $scope.id = $routeParams.id;
    $scope.title = null;
    $scope.url = null;

    videos.getById($scope.id).then(function(res) {
      $scope.title = res.title;
      $scope.url = res.url;
    });
  })
;
