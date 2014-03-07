angular.module('myApp', ['app.config', 'ngRoute', 'ngAnimate', 'ngResource',
    'angularSpinkit',
    'app.sidebar', 'app.homePages'])

  .config(function($routeProvider, TPL_PATH) {
    // $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: TPL_PATH + '/home.html'
      })
      .when('/problems', {
        controller: 'ProblemListCtrl',
        templateUrl: TPL_PATH + '/problemList.html'
      })
      .when('/problems/:id', {
        controller: 'ProblemCtrl',
        templateUrl: TPL_PATH + '/problem.html'
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
