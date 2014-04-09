angular.module('app.homePages')
.factory('problems', function(API_BASE, commonAPIs,$resource) {
  var res = $resource(API_BASE + '/problems/:id');

  var api = {
    create: function createNewProblem(newProblem) {
      return res.save(newProblem).$promise;
    },
    solved: function getSolved(solved){
      if(solved==undefined)
        solved = true;
      return res.query({solved:solved}).$promise.then(function (result) {
        return result.filter(function(problem){
          if(!problem.solved&&!solved)
            return true;
          return problem.solved==solved;
        });
      });
    }
  };

  return angular.extend(api, commonAPIs(res));
});