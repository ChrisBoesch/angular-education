angular
.module('app.courses')
.factory('courses', function(API_BASE, $resource,commonAPIs) {
  var res = $resource(API_BASE + '/courses/:id'),
    api = {
      create: function createNewCourse(newCourse) {
        return res.save(newCourse).$promise;
      }
    };
  return angular.extend(api, commonAPIs(res));
});
