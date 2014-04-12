angular.module('myApp')
  .controller("CreateCtrl", function($scope, $q, $log, create) {

    $scope.saving = false;
    $scope.authError = false;

    $scope.create = function(newData) {
      $scope.saving = true;

      return create(newData).catch(function(resp) {
        if (resp.status === 401 || resp.status === 403) {
          $scope.authError = true;
        } else {
          $log.error(resp);
        }

        return $q.reject(resp);
      })['finally'](function() {
        $scope.saving = false;
      });
    };
  });