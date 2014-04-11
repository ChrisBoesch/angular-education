angular.module('app.problems')
.controller('ProblemListCtrl', function($scope, problems) {
  $scope.problems = null;

  if(angular.isArray(problems)){
    $scope.problems = problems;
  }
  else{
    problems.all().then(function(res) {
      $scope.problems = res;
    });
  }
});