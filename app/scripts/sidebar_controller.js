angular.module('app.sidebar', ['app.config']).

  factory('stats',function(API_BASE, $resource) {
    var res = $resource(API_BASE + '/stats');
    return {
      get: function() {
        return res.get().$promise;
      }
    };
  }).

  controller('SidebarCtrl', function($scope, stats) {
    $scope.problemsCount = '?';
    $scope.unsolvedCount = '?';
    $scope.solvedCount = '?';

    stats.get().then(function(res) {
      $scope.problemsCount = res.problemsCount;
      $scope.unsolvedCount = res.unsolvedCount;
      $scope.solvedCount = res.solvedCount;
    });
  });
