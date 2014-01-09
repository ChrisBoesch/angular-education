angular.module('myApp', ['app.config', 'ngRoute', 'ngAnimate', 'ngResource',
    'angularSpinkit',
    'app.sidebar', 'app.homePages'])

  .config(function($routeProvider, $sceDelegateProvider, TPL_PATH) {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: TPL_PATH + '/home.html'
      })
      .when('/problem/:id', {
        controller: 'ProblemCtrl',
        templateUrl: TPL_PATH + '/problem.html'
      })
    ;

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      'http://localhost/**',
      'http*://www.youtube.com/watch**'
    ]);
  });
