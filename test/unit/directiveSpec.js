/*global describe, beforeEach, it, inject, expect, jasmine*/

describe('Directives', function() {

  beforeEach(module('app.directives', 'templates/alerts.html'));

  describe('eduAlerts directives', function() {
    var element, $scope, alerts;

    beforeEach(inject(function(_$compile_, _$rootScope_, _alerts_) {
      alerts = _alerts_;
      $scope = _$rootScope_.$new();
      element = angular.element('<edu-alerts></edu-alerts>');
      _$compile_(element)($scope);
      $scope.$apply();
    }));

    it('should be hidden while alerts is empty', function() {
      expect(element.css('display')).toBe('none');
    });

    it('should initialy contain an empty ul element', function() {
      expect(element.find('ul').length).toBe(1);
      expect(element.find('ul li').length).toBe(0);
    });

    it('should show when a message is added.', function() {
      alerts.info('foo bar baz.');
      $scope.$apply();
      expect(element.css('display')).not.toBe('none');
    });

    it('should add li element for each message in alerts.messages', function() {
      var first = alerts.info('foo bar.');
      $scope.$apply();
      expect(element.find('ul li').length).toBe(1);
      expect(element.find('ul li span:eq(-1)').text()).toBe('foo bar.');

      alerts.info('foo bar baz.');
      $scope.$apply();
      expect(element.find('ul li').length).toBe(2);
      expect(element.find('ul li span:eq(-1)').text()).toBe('foo bar baz.');

      alerts.remove(first);
      $scope.$apply();
      expect(element.find('ul li').length).toBe(1);
      expect(element.find('ul li span:eq(-1)').text()).toBe('foo bar baz.');
    });

    it('should let users remove messages', function() {
      alerts.info('foo bar baz.');
      $scope.$apply();

      element.find('ul li button.close').click();
      expect(element.find('ul li').length).toBe(0);
      expect(alerts.messages.length).toBe(0);
    });

  });

});
