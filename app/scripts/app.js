angular.module('myApp', ['app.config', 'app.directives', 'ngRoute', 'ngAnimate', 'ngResource',
  'angularSpinkit',
  'app.sidebar',
  'app.homePages',
  'app.topics',
  'app.courses',
  'ui.bootstrap'
  ])

.config(function($routeProvider, TPL_PATH) {
    $routeProvider
    .when('/', {
      controller: 'HomeCtrl',
      templateUrl: TPL_PATH + '/home.html'
    })
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
    })
    .when('/videos/create',{
      controller:'CreateVideoCtrl',
      templateUrl: TPL_PATH + '/createVideo.html'
    })
    .when('/videos/:id', {
      controller: 'VideoCtrl',
      templateUrl: TPL_PATH + '/video.html'
    })
    ;
  });
