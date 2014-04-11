angular
.module('app.problems')
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
});