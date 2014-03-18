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
      var res = $resource(API_BASE + '/videos/:id/');
      var api = {
        create: function(video){
          return res.save(video).$promise;
        }
      };

      return angular.extend(api, commonAPIs(res));
    })

    .factory('problems', function(API_BASE, $resource) {
      return commonAPIs($resource(API_BASE + '/problems/:id'));
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

    .controller("CreateVideoCtrl",function($scope, $location, videos){
      $scope.title = "Create video";

      $scope.create = function(video){
        videos.create(video).then(function(){
          $location.path('');
        });
      };
    })

    .controller('ProblemListCtrl', function($scope, problems) {
      $scope.problems = null;

      problems.all().then(function(res) {
        $scope.problems = res;
      });
    })

    .controller('ProblemCtrl', function($scope, $routeParams, problems, questions, question) {
      $scope.id = $routeParams.id;
      $scope.title = null;
      $scope.canProceed = false;

      $scope.$watch(question.current, function(newVal) {
        if (newVal) {
          $scope.question = question.current();
          $scope.total = question.total();
          $scope.position = question.position();
          $scope.isAnswered = question.isAnswered();
          $scope.hasNext = question.hasNext();
        }
      });

      problems.getById($scope.id).then(function(res) {
        $scope.title = res.title;
        question.set(res.questions);
        // TODO: Make it better
        $scope.questions = res.questions;
      });

      //TODO: implement as a filter
      $scope.currentClass = function(prefix, question) {
        var q = angular.isDefined(question) ? question : $scope.question;
        if (q) {
          switch (q.isCorrect) {
            case undefined:
              return prefix + '-warning';
            case true:
              return prefix + '-success';
            case false:
              return prefix + '-danger';
          }
        }
      };

      $scope.next = function() {
        question.next();
      };

      $scope.submit = function() {
        if (angular.isDefined($scope.question.answer)) {
          $scope.isAnswered = true;
          $scope.canProceed = true;
          questions.answer({
            // Question ID
            problemId: $scope.id,
            questionId: $scope.question.id,
            answer: $scope.question.answer
          }).then(
            // Success
            function(ret) {
              $scope.question.isCorrect = ret.isCorrect;
              $scope.canProceed = false;
            },
            // Error
            function() {
              $scope.isAnswered = false;
              $scope.canProceed = false;
            });
        }
      };

    })

    .controller('ProblemEditCtrl', function($scope, $routeParams, problems){
      var id = $routeParams.id;

      problems.getById(id).then(function (problemData) {
        $scope.problem = problemData;
      });
    })
  ;

}());
