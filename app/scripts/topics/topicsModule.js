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
        create:function($location,topics){
          return function(newData){
            return topics.create(newData).then(function(){
              $location.path('/topics/');
            });
          };
        }
      }
    })
    .when('/topics/:id',{
      controller:'DataCtrl',
      templateUrl: TPL_PATH+'/topic.html',
      resolve:{
        data:function($route,topics){
          return topics.getById($route.current.params.id);
        }
      }
    })
    .when('/topics/:id/edit',{
      controller: 'TopicsEditCtrl',
      templateUrl: TPL_PATH + '/topicEdit.html',
      resolve:{
        topic:function($route,topics){
          var id = $route.current.params.id;
          var topic = topics.getById(id);
          return topic;
        },
        save:function($location){
          return function(topic){
            return topic.$update()
              .then(function(){
                $location.path('/topics/'+topic.id);
              });
          };
        }
      }
    });
  });
