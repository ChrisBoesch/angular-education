/*global describe, beforeEach, afterEach, it, inject, expect, spyOn, document*/

describe('Sidebar', function() {

  beforeEach(module('app.sidebar'));

  describe('Factories', function() {

    describe('Stats Factory', function() {

      var $httpBackend, stats, API_BASE;

      beforeEach(inject(function(_$httpBackend_, _stats_, _API_BASE_) {
        $httpBackend = _$httpBackend_;
        stats = _stats_;
        API_BASE = _API_BASE_;
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
      });

      it('should return an objects when the get called', function() {
        var ret;
        $httpBackend.whenGET(API_BASE + '/stats').respond({});
        stats.get().then(function(data) {
          ret = data;
        });
        $httpBackend.flush();
        expect(ret).toBeDefined();
      });

    });

  });

  describe('Directives', function() {

    describe('activeLink Directive', function() {
      var element, $scope, $location, $browser;

      beforeEach(inject(function(_$compile_, _$rootScope_, _$location_, _$browser_) {
        $scope = _$rootScope_.$new();
        $location = _$location_;
        $browser = _$browser_;
        element = angular.element('<li active-link="active"><a href="#/one">One</a></li>');
        _$compile_(element)($scope);
        $scope.$apply();
      }));

      it('should not contain the active class by default', function() {
        expect(element.hasClass('active')).toBeFalsy();
      });

      it('should set active class for matching href url', function() {
        $location.path('/one');
        $scope.$apply();
        expect(element.hasClass('active')).toBeTruthy();
      });

      it('should remove the active class for non matching href url', function() {
        $location.path('/two');
        $scope.$apply();
        expect(element.hasClass('active')).toBeFalsy();
      });

    });

  });

  describe('Controllers', function() {

    var ctrl, $scope, deferred, stats;

    beforeEach(inject(function(_$q_, _stats_) {
      deferred = _$q_.defer();
      stats = _stats_;
      spyOn(stats, 'get').andReturn(deferred.promise);
    }));

    describe('Sidebar Controller', function() {

      beforeEach(inject(function(_$controller_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        ctrl = _$controller_('SidebarCtrl', {
          $scope: $scope
        });
      }));

      describe('Initialization', function() {

        it('should instantiate videosCount to ?', function() {
          expect($scope.videosCount).toEqual('?');
        });

        it('should instantiate problemsCount to ?', function() {
          expect($scope.problemsCount).toEqual('?');
        });

        it('should instantiate unsolvedCount to ?', function() {
          expect($scope.unsolvedCount).toEqual('?');
        });

        it('should instantiate solvedCount to ?', function() {
          expect($scope.solvedCount).toEqual('?');
        });

        it('should call the all function in factory', function() {
          expect(stats.get).toHaveBeenCalled();
        });

      });

      describe('After factory resolved', function() {

        it('should update all the counters', function() {
          var stats = {
            videosCount: 1,
            problemsCount: 2,
            unsolvedCount: 3,
            solvedCount: 4
          };
          deferred.resolve(stats);
          $scope.$apply();
          expect($scope.videosCount).toEqual(stats.videosCount);
          expect($scope.problemsCount).toEqual(stats.problemsCount);
          expect($scope.unsolvedCount).toEqual(stats.unsolvedCount);
          expect($scope.solvedCount).toEqual(stats.solvedCount);
        });

      });

    });

  });

});
