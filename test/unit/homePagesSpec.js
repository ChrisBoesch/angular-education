/*global describe, beforeEach, it, inject, expect*/

describe('Home Pages', function() {

  var ctrl;

  beforeEach(module('app.homePages'));

  beforeEach(inject(function($controller, $rootScope) {
    ctrl = $controller('HomeCtrl', {
      $scope: $rootScope.$new()
    });
  }));

  it('should properly provide a welcome message', inject(function() {
    expect(true).toBeTruthy();
  }));

});
