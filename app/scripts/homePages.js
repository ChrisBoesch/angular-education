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

  angular.module('app.homePages', ['app.config', 'app.services', 'ngResource', 'angularSpinkit'])
    .factory('videos', function(API_BASE, $resource) {
      var res = $resource(
          API_BASE + '/videos/:id/:property', null, {edit: {method: 'PUT'}}
        );

      var api = {
        create: function(video){
          return res.save(video).$promise;
        },
        getByProblemId: function(problem) {
          return res.query({problemId: problem.id}).$promise;
        },
        attach: function(video, problem) {
          return res.edit(
            {id: video.id, property: 'problem'},
            {problemId: problem.id}
          ).$promise;
        }
      };

      return angular.extend(api, commonAPIs(res));
    })

    .factory('questions', function(API_BASE, $resource) {
      var res = $resource(API_BASE + '/problems/:problemId/questions/:questionId/:verb'),
        api = {
          answer: function(data) {
            data.problemId = parseInt(data.problemId, 10);
            data.questionId = parseInt(data.questionId, 10);
            data.answer = parseInt(data.answer, 10);
            return res.save({
              problemId: data.problemId,
              questionId: data.questionId,
              verb: 'answer'
            }, data).$promise;
          },

          add: function(problem, question) {
            var params = {
                problemId: problem.id
              };

            return res.save(params, question).$promise;
          }
        };
      return angular.extend(api, commonAPIs(res));
    })

    .factory('question', function() {
      var qs = [],
        idx = 0,
        cur = null;

      return {
        // will have id, title, options
        current: function() {
          cur = (qs && qs.length) ? qs[idx] : null;
          if (cur && cur.answered) {
            cur.answer = cur.answered;
          }
          return cur;
        },

        set: function(questions) {
          qs = questions;
        },

        next: function() {
          if ((idx + 1) < qs.length) {
            ++idx;
          }
        },

        hasNext: function() {
          return (idx + 1) < qs.length;
        },

        position: function() {
          return Math.min(idx + 1, qs.length);
        },

        total: function() {
          return qs.length;
        },

        isAnswered: function() {
          return angular.isDefined(cur.answered);
        }
      };
    })

    .directive('questionForm', function($q, TPL_PATH){
      return {
        restrict: 'E',
        templateUrl: TPL_PATH + '/questionForm.html',
        transclude: true,
        scope: {
          problem: '=',
          onSubmit: '='
        },
        controller: function($scope) {
          $scope.addAnswer = function(answer) {
            if ($scope.question.options.indexOf(answer) > -1) {
              return;
            } else {
              $scope.newAnswer = '';
              $scope.question.options.push(answer);
            }
          };

          $scope.create = function(question) {
            if (!$scope.onSubmit || !$scope.isValid(question)) {
              return;
            }

            $q.when($scope.onSubmit($scope.problem, question)).then(function() {
              $scope.reset();
            });
          };

          $scope.reset = function() {
            $scope.question = { title: '', options: [], validAnswer: ''};
          };

          $scope.isValid = function(question) {
            return (
              question &&
              question.title &&
              question.options &&
              question.validAnswer &&
              question.options.length > 1 &&
              question.options.indexOf(question.validAnswer) > -1
            );
          };

          $scope.reset();
        }
      };
    })

    .directive('videoJs', function($window) {
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
              height: 0,
              forceSSL: true
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

          player = videojs(element.get(0), setup, function() {
            if (!isYouTube) {
              var source = ([
                {type: attrs.type, src: url}
              ]);

              this.src(source);

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
              $($window).on('resize', _.debounce(function() {
                resizeVideoJS();
              }, 50));
            }
          });

          // player.on('ended', $.noop);

          // remove the watch
          guard();
        });

        scope.$on('$destroy', function() {
          if (player) {
            player.dispose();
          }
          $($window).off('resize');
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

    .controller("CreateVideoCtrl",function($scope, $location, $q, $log, videos){
      $scope.title = "Create video";
      $scope.authError = false;

      $scope.create = function(video){
        $scope.authError = false;

        videos.create(video).then(function(){
          $location.path('');
        }).catch(function(resp) {
          if (resp.status === 401 || resp.status === 403) {
            $scope.authError = true;
          } else {
            $log.error(resp);
          }
          return $q.reject(resp);
        });
      };
    })

  ;

}());
