angular.module('myApp', ['ngRoute', 'app.homePages'])

  .constant('TPL_PATH', '/templates')

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/',{
      controller : 'HomeCtrl',
      templateUrl : TPL_PATH + '/home.html'
    });
  });
