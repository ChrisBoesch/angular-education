angular
.module('app.courses',
  ['ngRoute',
  'ngAnimate',
  'ngResource',
  'app.services'])
.config(function($routeProvider, TPL_PATH) {
    $routeProvider
    .when('/courses',{
      controller: 'DataCtrl',
      templateUrl: TPL_PATH + '/courses.html',
      resolve:{
        data:function (courses) {
          return courses.all();
        }
      }
    })
    .when('/courses/create',{
      controller: 'CreateCtrl',
      templateUrl: TPL_PATH + '/courseCreate.html',
      resolve:{
        create:function($location,courses){
          return function(course){
            return courses.create(course).then(function(){
              $location.path('/courses/');
            });
          };
        }
      }
    })
    .when('/courses/:id',{
      controller:'DataCtrl',
      templateUrl: TPL_PATH+'/course.html',
      resolve:{
        data:function($route,courses){
          return courses.getById($route.current.params.id);
        }
      }
    })
    .when('/courses/:id/edit',{
      controller: 'coursesEditCtrl',
      templateUrl: TPL_PATH + '/courseEdit.html',
      resolve:{
        topic:function($route,courses){
          var id = $route.current.params.id;
          var topic = courses.getById(id);
          return topic;
        },
        save:function($location){
          return function(course){
            return course.$save()
              .then(function(){
                $location.path('/courses/');
              });
          };
        }
      }
    });
  });
