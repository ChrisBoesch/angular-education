/*global videojs, _*/

(function() {
  'use strict';

  // Common function on top to comply with JSHint
  function commonAPIs(res) {
    return {
      all: function() {
        return res.query().$promise;
      },
      getById: function(id) {
        return res.get({id: id}).$promise;
      }
    };
  }

  angular.module('app.homePages', ['app.config', 'ngResource', 'angularSpinkit'])

    .factory('videos', function(API_BASE, $resource) {
      return commonAPIs($resource(API_BASE + '/videos/:id'));
    })

    .factory('problems', function(API_BASE, $resource) {
      return commonAPIs($resource(API_BASE + '/problems/:id'));
    })

    .factory('question', function() {
      var qs = [],
        idx = 0,
        cache = [];

      return {
        // will have id, title, options
        current: function() {
          return qs.length ? qs[idx] : null;
        },

        set: function(questions) {
          qs = questions;
          this.trigger('update', qs);
        },

        next: function() {
          if ((idx + 1) < qs.length) {
            ++idx;
            this.trigger('update', qs);
          }
        },

        position: function() {
          return Math.min(idx + 1, qs.length);
        },

        // Simple event bus implementation
        on: function(event, fn) {
          cache[event] = fn;
        },

        trigger: function(event, data) {
          var fn = cache[event];
          if (fn) {
            fn.call(null, data);
          }
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

          var setup, isYouTube = scope.url.indexOf('www.youtube.com/watch?') > -1;

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

              var myPlayer = this,
                aspectRatio = 9 / 16;

              var resizeVideoJS = function() {
                // Get the parent element's actual width
                var width = element.parent().parent().width();

                // Set width to fill parent element, Set height
                myPlayer.width(width).height(width * aspectRatio);
              };

              // Initialize the function
              resizeVideoJS();

              // Call the function on resize
              $(window).on('resize', _.debounce(function() {
                resizeVideoJS();
              }, 50));
            }
          });

          player.on('ended', function() {
            console.log('ended');
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

    .directive('tooltip', function() {
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, element) {
          element.tooltip();
        }
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
      $scope.isYouTube = false;

      videos.getById($scope.id).then(function(res) {
        angular.extend($scope, res);
        $scope.isYouTube = res.url && res.url.indexOf('www.youtube.com/watch?') > -1;
      });
    })

    .controller('ProblemListCtrl', function($scope, problems) {
      $scope.problems = null;

      problems.all().then(function(res) {
        $scope.problems = res;
      });
    })

    .controller('ProblemCtrl', function($scope, $routeParams, problems, question) {
      $scope.id = $routeParams.id;
      $scope.title = null;

      // Answer logged in server
      $scope.logged = false;
      $scope.next = function() {
        question.next();
      };

      // Event Bus
      question.on('update', function(data) {
        $scope.question = question.current();
        $scope.total = data.length;
        $scope.position = question.position();
      });

      problems.getById($scope.id).then(function(res) {
        $scope.title = res.title;
        question.set(res.questions);
      });

    })

  ;

}());
