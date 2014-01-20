/*global describe, beforeEach, it, inject, expect*/

describe('Routing', function() {

  var $route, TPL_PATH;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$route_, _TPL_PATH_) {
    $route = _$route_;
    TPL_PATH = _TPL_PATH_;
  }));

  it('should map / to home controller', function() {
    expect($route.routes['/'].controller).toEqual('HomeCtrl');
    expect($route.routes['/'].templateUrl).toEqual(TPL_PATH + '/home.html');
  });

  it('should map /problems to problem list controller', function() {
    expect($route.routes['/problems'].controller).toEqual('ProblemListCtrl');
    expect($route.routes['/problems'].templateUrl).toEqual(TPL_PATH + '/problemList.html');
  });

  it('should map /video/:id to video controller', function() {
    expect($route.routes['/video/:id'].controller).toEqual('VideoCtrl');
    expect($route.routes['/video/:id'].templateUrl).toEqual(TPL_PATH + '/video.html');
  });

});
