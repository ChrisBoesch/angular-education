angular.module('myApp', ['app.config', 'ngRoute', 'ngAnimate', 'ngResource',
    'angularSpinkit',
    'app.sidebar', 'app.homePages'])

  .config(function($routeProvider, $sceDelegateProvider, TPL_PATH) {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: TPL_PATH + '/home.html'
      })
      .when('/video/:id', {
        controller: 'VideoCtrl',
        templateUrl: TPL_PATH + '/video.html'
      })
    ;

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      'http://localhost/**',
      'http*://www.youtube.com/watch**'
    ]);
  });
