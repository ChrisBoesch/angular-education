angular.
module('app.problems')
.controller('ProblemCreateCtrl', function($scope, $location, $q, $log, alerts, problems) {
  $scope.savingProblem = false;
  $scope.authError = false;
  $scope.create = function createProblem(newProblem) {
    $scope.savingProblem = true;
    $scope.authError = false;

    problems.create(newProblem).then(function() {
      $location.path('/problems');
    }).catch(function (resp){
      if (resp.status === 401 || resp.status === 403) {
        $scope.authError = true;
      } else {
        $log.error(resp);
      }
      return $q.reject(resp);
    })['finally'](function problemSaved() {
      $scope.savingProblem = false;
    });
  };
});
