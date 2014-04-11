angular.
module('app.problems',
  ['ngRoute',
  'ngAnimate',
  'ngResource',
  'app.services',
  'app.config'])
.config(function($routeProvider, TPL_PATH) {
  $routeProvider
  .when('/problems', {
    controller: 'ProblemListCtrl',
    templateUrl: TPL_PATH + '/problemList.html'
  })
  .when('/problems/solved',{
    controller: 'ProblemListCtrl',
    templateUrl: TPL_PATH + '/problemList.html',
    resolve:{
      problems: function(problems){
        return problems.solved();
      }
    }
  })
  .when('/problems/unsolved',{
    controller: 'ProblemListCtrl',
    templateUrl: TPL_PATH + '/problemList.html',
    resolve:{
      problems: function(problems){
        return problems.solved(false);
      }
    }
  })
  .when('/problems/create',{
    controller: 'ProblemCreateCtrl',
    templateUrl: TPL_PATH + '/problemCreate.html'
  })
  .when('/problems/:id', {
    controller: 'ProblemCtrl',
    templateUrl: TPL_PATH + '/problem.html'
  })
  .when('/problems/:id/edit',{
    controller: 'ProblemEditCtrl',
    templateUrl: TPL_PATH + '/problemEdit.html'
  });
});

