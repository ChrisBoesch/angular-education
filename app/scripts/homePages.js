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

    .factory('problems', function(API_BASE, $resource) {
      var res = $resource(API_BASE + '/problems/:id'),
        api = {
          create: function createNewProblem(newProblem) {
            return res.save(newProblem).$promise;
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

    .controller("CreateVideoCtrl",function($scope, $location, videos){
      $scope.title = "Create video";

      $scope.create = function(video){
        videos.create(video).then(function(){
          $location.path('');
        });
      };
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

    .controller('ProblemCreateCtrl', function($scope, $location, alerts, problems) {
      $scope.savingProblem = false;
      $scope.create = function createProblem(newProblem) {
        $scope.savingProblem = true;

        problems.create(newProblem).then(function() {
          $location.path('/problems');
        }).catch(function (){
          alerts.warning('Failed to save the problem');
        })['finally'](function problemSaved() {
          $scope.savingProblem = false;
        });
      };
    })

    .controller('ProblemEditCtrl', function($scope, $routeParams, alerts, videos, problems, questions){
      var id = $routeParams.id;

      $scope.show = {
        attachForm: false
      };

      problems.getById(id).then(function (problemData) {
        $scope.problem = problemData;
        return problemData;
      });

      videos.getByProblemId({id: id}).then(function(videoList) {
        if (videoList.length > 0 ) {
          $scope.video = videoList[0];
        }
      });

      videos.all().then(function(videoList) {
        $scope.videos = videoList;
      });

      $scope.attachVideo = function(video, problem) {
        return videos.attach(video, problem).then(function() {
          $scope.video = video;
          $scope.show.attachForm = false;
        }).catch(function() {
          alerts.warning("Error: could not attached problem to video.");
        });
      };

      $scope.resetAttachForm = function () {
        $scope.show.attachForm = false;
        if ($scope.attach && $scope.attach.video) {
          $scope.attach.video = null;
        }
      };

      $scope.showNewQuestionForm = false;
      $scope.addQuestion = function(problem, question) {
        if (!question) {
          $scope.showNewQuestionForm = false;
        }

        return questions.add(problem, question).then(function(data) {
          $scope.showNewQuestionForm = false;
          $scope.problem.questions.push(data);
          return data;
        }).catch(function(data) {
          alerts.warning("Error: could not save the question");
          throw data;
        });
      };
    })
  ;

}());
