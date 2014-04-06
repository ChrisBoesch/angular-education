angular.module('myApp')
.controller("CreateCtrl",function($scope, $location){
  //$scope.data = data;
  $scope.savingProblem = false;
  $scope.create = function createProblem(newProblem) {
    $scope.savingTopic = true;
    $location.path('/topics');
    //problems.create(newProblem).then(function() {
    //  $location.path('/problems');
    //}).catch(function (){
    //  alerts.warning('Failed to save the problem');
    //})['finally'](function problemSaved() {
    //  $scope.savingProblem = false;
    //});
  };
  //$scope.create = create;
});