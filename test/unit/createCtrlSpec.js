describe('Create Controller', function() {
  beforeEach(module('myApp'));
  var controller,
    $scope;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $scope = _$rootScope_.$new();
    controller = _$controller_;
  }));

  it('should set create callback in scope', function() {
    controller('CreateCtrl',
      {
        $scope:$scope,       
        create: function Callback(){}
      });
    $scope.$digest();
    
    expect($scope.create).toBeDefined();
  });
});