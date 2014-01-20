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
      .when('/video/:id', {
        controller: 'VideoCtrl',
        templateUrl: TPL_PATH + '/video.html'
      })
    ;
  });
