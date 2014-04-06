angular.module('myApp')
.controller("CreateCtrl",function($scope,create){
  
  $scope.savingProblem = false;
  
  $scope.create = function(newData){
    debugger;
    return create(newData);
  };  
});