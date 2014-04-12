angular.
module('app.problems')
.controller('ProblemCtrl', function($scope, $routeParams, problems, questions, question) {
  $scope.id = $routeParams.id;
  $scope.title = null;
  $scope.canProceed = false;
  $scope.authError = false;

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

    if ($scope.authError) {
      return prefix + '-danger';
    }

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
      $scope.authError = false;
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
        function(resp) {
          $scope.isAnswered = false;
          $scope.canProceed = false;
          $scope.authError = resp.status === 401;
        });
    }
  };
});
