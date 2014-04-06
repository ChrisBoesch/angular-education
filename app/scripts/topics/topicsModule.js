angular
.module('app.topics',
  ['ngRoute',
  'ngAnimate',
  'ngResource',
  'app.services'])
.config(function($routeProvider, TPL_PATH) {
    // $locationProvider.html5Mode(true);
    $routeProvider
    .when('/topics',{
      controller: 'DataCtrl',
      templateUrl: TPL_PATH + '/topics.html',
      resolve:{
        data:function (topics) {
          return topics.all();
        }
      }
    })
    .when('/topics/create',{
      controller: 'CreateCtrl',
      templateUrl: TPL_PATH + '/topicCreate.html',
      resolve:{
        // create:function(topic){
        //   //$location.path('');
        // }
      }
    });
  });
