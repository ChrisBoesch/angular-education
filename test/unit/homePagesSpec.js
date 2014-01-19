/*global describe, beforeEach, afterEach, it, inject, expect, spyOn, document*/

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
        var ret, arr = [
          {one: 1},
          {two: 2}
        ];
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

  describe('Directives', function() {

    // TODO: Fix the videojs issue
    describe('videoJs Directive', function() {
      var element, $scope;

      beforeEach(inject(function(_$compile_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        $scope.url = null;
        element = angular.element('<video video-js class="video-js vjs-default-skin"></video><');
        _$compile_(element)($scope);
        angular.element(document.body).append(element);
        $scope.$apply();
      }));

      afterEach(function() {
        angular.element(document.body).html('');
      });

      it('should add a ID to the element', function() {
        $scope.id = 7;
        $scope.url = 'http://example.com/superman.mp4';
        $scope.$apply();
        expect(element.attr('id')).toEqual('video-js' + $scope.id + '_html5_api');
      });

      it('should pass the ID and the html5 config for non youtube video', function() {
        $scope.id = 7;
        $scope.url = 'http://example.com/superman.mp4';
        spyOn(window, 'videojs').andCallThrough();
        $scope.$apply();
        var config = {
          techOrder: [ 'html5' ],
          controls: true,
          preload: 'auto',
          autoplay: false,
          width: 'auto',
          height: 'auto'
        };
        expect(window.videojs).toHaveBeenCalledWith('video-js' + $scope.id, config);
      });

      it('should pass the ID and the youtube config for youtube video', function() {
        $scope.id = 7;
        $scope.url = 'http://www.youtube.com/watch?v=vO_Ie3kMXbY';
        spyOn(window, 'videojs').andCallThrough();
        $scope.$apply();
        var config = {
          techOrder: ['youtube'],
          src: $scope.url,
          controls: true,
          preload: 'auto',
          autoplay: false,
          ytcontrols: false,
          width: '100%',
          height: 0
        };
        expect(window.videojs).toHaveBeenCalledWith('video-js' + $scope.id, config);
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
