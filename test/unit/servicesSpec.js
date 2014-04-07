/*global describe, beforeEach, it, inject, expect, jasmine*/

describe('Services', function() {

  beforeEach(module('app.services'));

  describe('Event Factory', function() {

    var event;

    beforeEach(inject(function(_event_) {
      event = _event_;
    }));

    it('should do nothing for unknown calls', function() {
      var cb = jasmine.createSpy(), data = Math.random();
      event.on('event1', cb);
      event.trigger('event2', data);
      expect(cb).not.toHaveBeenCalled();
    });

    it('should invoke the callback when triggered', function() {
      var cb = jasmine.createSpy(), data = Math.random();
      event.on('event1', cb);
      event.trigger('event1', data);
      expect(cb).toHaveBeenCalledWith(data);
    });

    it('should invoke multiple callbacks when triggered', function() {
      var cb1 = jasmine.createSpy(), cb2 = jasmine.createSpy(), data = Math.random();
      event.on('event1', cb1);
      event.on('event1', cb2);
      event.trigger('event1', data);
      expect(cb1).toHaveBeenCalledWith(data);
      expect(cb2).toHaveBeenCalledWith(data);
    });

  });

  describe('Alert service', function() {
    var alerts;

    beforeEach(inject(function(_alerts_) {
      alerts = _alerts_;
    }));

    it('should initailly be empty', function() {
      expect(alerts.messages.length).toBe(0);
    });

    it('should push messages', function() {
      alerts.push('foo bar', alerts.DANGER);
      expect(alerts.messages.length).toBe(1);
      expect(alerts.messages[0]).toEqual({
        id: 1,
        level: 'danger',
        content: 'foo bar'
      });
    });

    it('should push info messages by default', function() {
      alerts.push('foo bar');
      expect(alerts.messages.length).toBe(1);
      expect(alerts.messages[0]).toEqual({
        id: 1,
        level: 'info',
        content: 'foo bar'
      });
    });

    it('should push info messages', function() {
      alerts.info('foo bar');
      expect(alerts.messages.length).toBe(1);
      expect(alerts.messages[0]).toEqual({
        id: 1,
        level: 'info',
        content: 'foo bar'
      });
    });

    it('should push success messages', function() {
      alerts.success('foo bar');
      expect(alerts.messages.length).toBe(1);
      expect(alerts.messages[0]).toEqual({
        id: 1,
        level: 'success',
        content: 'foo bar'
      });
    });

    it('should push danger messages', function() {
      alerts.danger('foo bar');
      expect(alerts.messages.length).toBe(1);
      expect(alerts.messages[0]).toEqual({
        id: 1,
        level: 'danger',
        content: 'foo bar'
      });
    });

    it('should push warning messages', function() {
      alerts.warning('foo bar');
      expect(alerts.messages.length).toBe(1);
      expect(alerts.messages[0]).toEqual({
        id: 1,
        level: 'warning',
        content: 'foo bar'
      });
    });

    it('should remove messages', function() {
      var i = alerts.info('foo bar'),
        d = alerts.danger('foo bar');

      expect(alerts.messages.length).toBe(2);

      alerts.remove(i);
      expect(alerts.messages.length).toBe(1);
      expect(alerts.messages[0]).toBe(d);
    });
  });

  describe('CommonAPIs',function(){
    var commonAPIs,
    testRes;
    beforeEach(inject(function (_commonAPIs_) {
        commonAPIs = _commonAPIs_;
    }));

    it('Should have all and getById', function() {
      var res = commonAPIs({});
      expect(res.all).toBeDefined();
      expect(res.getById).toBeDefined();
    });
  })
});
