angular
.module('app.topics',
  ['ngRoute',
  'ngAnimate',
  'ngResource',
  'app.services'])
.config(function($routeProvider, TPL_PATH) {
    // $locationProvider.html5Mode(true);
    var exampleTopic = {
            id:1,
            title:'Basics of javascript'
          };

    $routeProvider
    .when('/topics',{
      controller: 'DataCtrl',
      templateUrl: TPL_PATH + '/topics.html',
      resolve:{
        data:function () {
          return [exampleTopic];
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
  }).factory('test2',function(){});
