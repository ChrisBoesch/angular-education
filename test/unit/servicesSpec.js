/*global describe, beforeEach, it, inject, expect, jasmine*/

describe('Services', function() {

  beforeEach(module('app.services'));

  describe('Event Factory', function() {

    var event;

    beforeEach(inject(function(_event_) {
      event = _event_;
    }));

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

});
