angular
.module('app.topics')
.factory('topics', function(API_BASE, $resource,commonAPIs) {
  var res = $resource(API_BASE + '/topics/:id'),
    api = {
      create: function createNewTopic(newProblem) {
        return res.save(newProblem).$promise;
      }
    };

  return angular.extend(api, commonAPIs(res));
});
