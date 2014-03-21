(function() {
  'use strict';

  angular.module('app.directives', ['app.config', 'app.services'])

  .directive('eduAlerts', function(TPL_PATH) {
    return {
      templateUrl: TPL_PATH + '/alerts.html',
      restrict: 'E',
      controller: function($scope, alerts) {
        $scope.messages = alerts.messages;
        $scope.remove = function(message){
          alerts.remove(message);
        };
      },
      link: function(scope, iElement) {
        scope.$watch('messages.length', function() {
          if (scope.messages.length < 1) {
            iElement.hide();
          } else {
            iElement.show();
          }
        });
      }
    };
  })

  ;

}());
