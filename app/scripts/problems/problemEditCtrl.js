angular
.module('app.problems')
.controller('ProblemEditCtrl', function($scope, $routeParams, $q, $log, videos, problems, questions){
  var id = $routeParams.id;

  $scope.show = {
    attachForm: false
  };
  $scope.authError = false;

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

  function onError(resp) {
    if (resp.status === 401 || resp.status === 403) {
      $scope.authError = true;
    } else {
      $log.error(resp);
    }
    return $q.reject(resp);
  }

  $scope.attachVideo = function(video, problem) {
    $scope.authError = false;

    return videos.attach(video, problem).then(function() {
      $scope.video = video;
      $scope.show.attachForm = false;
    }).catch(onError);
  };

  $scope.resetAttachForm = function () {
    $scope.show.attachForm = false;
    if ($scope.attach && $scope.attach.video) {
      $scope.attach.video = null;
    }
  };

  $scope.showNewQuestionForm = false;
  $scope.addQuestion = function(problem, question) {
    $scope.authError = false;

    if (!question) {
      $scope.showNewQuestionForm = false;
    }

    return questions.add(problem, question).then(function(data) {
      $scope.showNewQuestionForm = false;
      $scope.problem.questions.push(data);
      return data;
    }).catch(onError);
  };
});