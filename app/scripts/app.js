angular.module('myApp', ['ngRoute', 'app.homePages'])

  .constant('TPL_PATH', '/templates')
  .constant('API_BASE', '/api/v1')

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/', {
      controller: 'HomeCtrl',
      templateUrl: TPL_PATH + '/home.html'
    });
  });
