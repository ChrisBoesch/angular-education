angular.module('myApp', ['app.config', 'app.directives', 'ngRoute', 'ngAnimate', 'ngResource',
  'angularSpinkit',
  'app.sidebar',
  'app.homePages',
  'app.topics',
  'app.courses',
  'app.problems',
  'ui.bootstrap',
  'scceUser.directives'
  ])

.config(function($routeProvider, TPL_PATH) {
    $routeProvider
    .when('/', {
      controller: 'HomeCtrl',
      templateUrl: TPL_PATH + '/home.html'
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
