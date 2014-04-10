angular
  .module('app.topics')
  .factory('topics', function(API_BASE, $resource, commonAPIs) {
    var res = $resource(
        API_BASE + '/topics/:id',
        {id: '@id'},
        {update: {method: 'PUT'}}
      ),
      api = {
        create: function createNewTopic(newTopic) {
          return res.save(newTopic).$promise;
        },
        update: function update(topic) {
          return res.update(topic).$promise;
        }
      };
    return angular.extend(api, commonAPIs(res));
  });