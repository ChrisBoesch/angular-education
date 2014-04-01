describe('Home Pages', function() {

  beforeEach(module('app.homePages'));

  var ctrl, $scope,deferred, problems;

  beforeEach(inject(function(_$q_, _problems_) {     
    deferred = _$q_.defer();    
    problems = _problems_;
    
    spyOn(problems, 'all').andReturn(deferred.promise);
  }));

  describe('Problem List Controller: without resolve', function() {

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      ctrl = _$controller_('ProblemListCtrl', {
        $scope: $scope,
        problems:problems
      });
    }));

    describe('Initialization', function() {
      it('should instantiate problems to null', function() {
        expect($scope.problems).toBeNull();
      });
      it('should call the all function in factory', function() {
        expect(problems.all).toHaveBeenCalled();
      });
    });
    describe('After factory resolved', function() {

      it('should update the problems with content from factory', function() {
        var problems = [1, 2, 3];
        deferred.resolve(problems);
        $scope.$apply();
        expect($scope.problems).toEqual(problems);
      });
    });
  });

  describe('Problem List Controller: problems resolved in route', function() {
    var problemsList = [{id:1}];

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      ctrl = _$controller_('ProblemListCtrl', {
        $scope: $scope,
        problems:problemsList
      });
    }));

    it('should copy input to scope.problems', function() {
      expect($scope.problems).toEqual(problemsList);
    })
  });
});
