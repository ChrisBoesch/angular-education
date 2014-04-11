angular.
module('app.problems')
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
});
