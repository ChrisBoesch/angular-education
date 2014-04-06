angular.module('myApp')
.controller("CreateCtrl",function($scope,create){
  
  $scope.savingProblem = false;
  
  $scope.create = function(newData){
    return create(newData);
  };
});