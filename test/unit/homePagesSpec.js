/*global describe, beforeEach, it, inject, expect, spyOn*/

describe('Home Pages', function() {

  beforeEach(module('app.homePages'));

  describe('Factories', function() {

    describe('Videos Factory', function() {

      var $httpBackend, videos, API_BASE;

      beforeEach(inject(function(_$httpBackend_, _videos_, _API_BASE_) {
        $httpBackend = _$httpBackend_;
        videos = _videos_;
        API_BASE = _API_BASE_;
      }));

      it('should return an array of objects when the all get called', function() {
        var ret, arr = [{one: 1}, {two: 2}];
        $httpBackend.whenGET(API_BASE + '/videos').respond(arr);
        videos.all().then(function(data) {
          ret = data;
        });
        $httpBackend.flush();
        expect(ret.length).toEqual(arr.length);
        expect(ret[0].one).toEqual(1);
        expect(ret[1].two).toEqual(2);
      });

      it('should return an array of objects when the all get called', function() {
        var ret, obj = {id: 1};
        $httpBackend.whenGET(API_BASE + '/videos/' + obj.id).respond(obj);
        videos.getById(obj.id).then(function(data) {
          ret = data;
        });
        $httpBackend.flush();
        expect(ret.id).toEqual(1);
      });

    });

  });

  describe('Controllers', function() {

    var ctrl, $scope, deferred, videos;

    beforeEach(inject(function(_$q_, _videos_) {
      deferred = _$q_.defer();
      videos = _videos_;
      spyOn(videos, 'all').andReturn(deferred.promise);
      spyOn(videos, 'getById').andReturn(deferred.promise);
    }));

    describe('Home Controller', function() {

      beforeEach(inject(function(_$controller_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        ctrl = _$controller_('HomeCtrl', {
          $scope: $scope
        });
      }));

      describe('Initialization', function() {

        it('should instantiate videos to null', function() {
          expect($scope.videos).toBeNull();
        });

        it('should call the all function in factory', function() {
          expect(videos.all).toHaveBeenCalled();
        });

      });

      describe('After factory resolved', function() {

        it('should update the videos with content from factory', function() {
          var videos = [1, 2, 3];
          deferred.resolve(videos);
          $scope.$apply();
          expect($scope.videos).toEqual(videos);
        });

      });

    });

    describe('Video Controller', function() {
      // Generate a random id between 0~100
      var routeParamId = (Math.random() * 100).toFixed(0);

      beforeEach(inject(function(_$controller_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        ctrl = _$controller_('VideoCtrl', {
          $scope: $scope,
          $routeParams: {
            id: routeParamId
          }
        });
      }));

      describe('Initialization', function() {

        it('should instantiate id to the given routeParam id', function() {
          expect($scope.id).toEqual(routeParamId);
        });

        it('should instantiate title to null', function() {
          expect($scope.title).toBeNull();
        });

        it('should instantiate url to null', function() {
          expect($scope.url).toBeNull();
        });

        it('should call the getById function in factory', function() {
          expect(videos.getById).toHaveBeenCalledWith(routeParamId);
        });

      });

      describe('After factory resolved', function() {

        it('should update the title with content from factory', function() {
          var title = 'awesome video';
          deferred.resolve({title: title});
          $scope.$apply();
          expect($scope.title).toEqual(title);
        });

        it('should update the url with content from factory', function() {
          var url = 'http://example.com/superman.mp4';
          deferred.resolve({url: url});
          $scope.$apply();
          expect($scope.url).toEqual(url);
        });

      });

    });

  });

});
