angular
.module('app.topics',
  ['ngRoute',
  'ngAnimate',
  'ngResource'])
.config(function($routeProvider, TPL_PATH) {
    // $locationProvider.html5Mode(true);
    $routeProvider
    .when('/topics',{
      controller: 'DataCtrl',
      templateUrl: TPL_PATH + '/topics.html',
      resolve:{
        data:function () {
          return [{
            id:1,
            title:'Basics of javascript'
          }];
        }
      }
    });
  });
