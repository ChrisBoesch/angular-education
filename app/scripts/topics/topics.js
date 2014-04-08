angular
.module('app.topics')
.factory('topics', function(API_BASE, $resource,commonAPIs) {
  var res = $resource(API_BASE + '/topics/:id'),
    api = {
      create: function createNewTopic(newCourse) {
        return res.save(newCourse).$promise;
      }
    };
  return angular.extend(api, commonAPIs(res));
});
