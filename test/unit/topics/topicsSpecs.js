describe('Topics', function() {
  beforeEach(module('ngResource'));
  beforeEach(module('app.config'));
  beforeEach(module('app.topics'));

  var topics,
  _$httpBackend_,
   API_BASE;
  beforeEach(inject(function(_$httpBackend_,_API_BASE_,_topics_){
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

  it('should call POST to /topics on create',function(){
    $httpBackend
    .expectPOST(API_BASE + '/topics')
    .respond(200,{});
    topics.create({id:1});
  });
});