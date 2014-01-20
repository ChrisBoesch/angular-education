angular.module('app.sidebar', ['app.config'])

  .factory('stats', function(API_BASE, $resource) {
    var res = $resource(API_BASE + '/stats');
    return {
      get: function() {
        return res.get().$promise;
      }
    };
  })

  .directive('activeLink', function($location) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(element, attrs) {
        var location = $location,
          clazz = attrs.activeLink,
          path = '/' + attrs.href;
        return function link(scope, element) {
          scope.$watch(function() {
            return location.path();
          }, function(newPath) {
            if (path === newPath) {
              element.addClass(clazz);
            } else {
              element.removeClass(clazz);
            }
          });
        };
      }
    };
  })

  .controller('SidebarCtrl', function($scope, stats) {
    $scope.videosCount = '?';
    $scope.problemsCount = '?';
    $scope.unsolvedCount = '?';
    $scope.solvedCount = '?';

    stats.get().then(function(res) {
      // inject all the return variables to scope
      angular.extend($scope, res);
    });
  });
