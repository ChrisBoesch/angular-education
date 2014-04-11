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
  })
.run(function($rootScope) {
  $rootScope.$on('$routeChangeStart', function(e, curr) {
    if (curr.$$route && curr.$$route.resolve) {
      $rootScope.loadingView = true;
    }
  });
  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loadingView = false;
  });
});
