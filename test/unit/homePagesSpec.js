/*global describe, beforeEach, it, inject, expect*/

describe('Home Pages', function() {

  var ctrl, scope, fakeVideoService;

  beforeEach(module('app.homePages'));

  beforeEach(inject(function($q) {
    var f = function() {
      return this.deferred.promise;
    };
    fakeVideoService = {
      deferred: $q.defer(),
      all: f,
      getById: f
    };
  }));

  describe('Home Controller', function() {

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('HomeCtrl', {
        $scope: scope,
        videos: fakeVideoService
      });
    }));

    describe('Initialization', function() {

      it('should instantiate videos to null', function() {
        expect(scope.videos).toBeNull();
      });

    });

    describe('After service resolved', function() {

      it('should update the videos with content from service', function() {
        var videos = [1, 2, 3];
        fakeVideoService.deferred.resolve(videos);
        scope.$digest();
        expect(scope.videos).toBe(videos);
      });

    });

  });


  describe('Video Controller', function() {
    // Generate a random id between 0~100
    var routeParamId = (Math.random() * 100).toFixed(0);

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('VideoCtrl', {
        $scope: scope,
        $routeParams: {
          id: routeParamId
        },
        videos: fakeVideoService
      });
    }));

    describe('Initialization', function() {

      it('should instantiate id to the given routeParam id', function() {
        expect(scope.id).toBe(routeParamId);
      });

      it('should instantiate title to null', function() {
        expect(scope.title).toBeNull();
      });

      it('should instantiate url to null', function() {
        expect(scope.url).toBeNull();
      });

    });

    describe('After service resolved', function() {

      it('should update the title with content from service', function() {
        var title = 'awesome video';
        fakeVideoService.deferred.resolve({title: title});
        scope.$digest();
        expect(scope.title).toBe(title);
      });

      it('should update the url with content from service', function() {
        var url = 'http://example.com/superman.mp4';
        fakeVideoService.deferred.resolve({url: url});
        scope.$digest();
        expect(scope.url).toBe(url);
      });

    });

  });

});
