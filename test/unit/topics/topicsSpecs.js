/* global describe, beforeEach, afterEach, it, inject, expect */

describe('Topics', function() {
  beforeEach(module('ngResource'));
  beforeEach(module('app.config'));
  beforeEach(module('app.topics'));

  var topics,
    $httpBackend,
    API_BASE;

  beforeEach(inject(function(_$httpBackend_, _API_BASE_, _topics_) {
    $httpBackend = _$httpBackend_;
    topics = _topics_;
    API_BASE = _API_BASE_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should have common Api', function() {
    expect(topics.all).toBeDefined();
    expect(topics.getById).toBeDefined();
  });

  it('should call POST to /topics on create', function() {
    var result;

    $httpBackend
      .expectPOST(API_BASE + '/topics')
      .respond(200, {});

    topics
      .create({
        title: 'foo'
      })
      .then(function(res) {
        result = res;
      });

    $httpBackend.flush();
    expect(result).toBeDefined();
    expect(result.$resolved).toBeTruthy();
  });

  it('should call PUT to /topics/:id on update', function() {
      var result;

      $httpBackend
        .expectPUT(API_BASE + '/topics/1')
        .respond(200, {});
      result = topics.update({id: 1, title: 'foo'});
      $httpBackend.flush();
    });
});