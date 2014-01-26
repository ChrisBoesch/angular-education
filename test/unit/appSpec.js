/*global describe, beforeEach, it, inject, expect*/

describe('Routing', function() {

  var $route, TPL_PATH;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$route_, _TPL_PATH_) {
    $route = _$route_;
    TPL_PATH = _TPL_PATH_;
  }));

  it('should map / to home controller', function() {
    var route = '/';
    expect($route.routes[route].controller).toEqual('HomeCtrl');
    expect($route.routes[route].templateUrl).toEqual(TPL_PATH + '/home.html');
  });

  it('should map /problems to problem list controller', function() {
    var route = '/problems';
    expect($route.routes[route].controller).toEqual('ProblemListCtrl');
    expect($route.routes[route].templateUrl).toEqual(TPL_PATH + '/problemList.html');
  });

  it('should map /problems/:id to problem controller', function() {
    var route = '/problems/:id';
    expect($route.routes[route].controller).toEqual('ProblemCtrl');
    expect($route.routes[route].templateUrl).toEqual(TPL_PATH + '/problem.html');
  });

  it('should map /video/:id to video controller', function() {
    var route = '/videos/:id';
    expect($route.routes[route].controller).toEqual('VideoCtrl');
    expect($route.routes[route].templateUrl).toEqual(TPL_PATH + '/video.html');
  });

});
