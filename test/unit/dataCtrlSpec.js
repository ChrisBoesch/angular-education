describe('Home Controller', function() {
  beforeEach(module('myApp'));
  var controller,
    $scope;
  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $scope = _$rootScope_.$new();
    controller = _$controller_;
  }));

  it('should update scope with data', function() {
    controller('DataCtrl',
      {$scope:$scope,
        data:"test"});
    $scope.$digest();
    expect($scope.data).toBeTruthy();
  });
});