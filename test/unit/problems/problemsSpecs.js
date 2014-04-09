describe('Problems Factory', function() {

  var problems, ret;
  var $httpBackend, API_BASE;
  
  beforeEach(module('app.homePages'));

  beforeEach(inject(function(_$httpBackend_, _API_BASE_, _problems_) {
    $httpBackend = _$httpBackend_;
    API_BASE = _API_BASE_;
    problems = _problems_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });


  it('should return an array of objects when the all get called', function() {
    $httpBackend.whenGET(API_BASE + '/problems').respond([]);
    problems.all().then(function(data) {
      ret = data;
    });
    $httpBackend.flush();
    expect(ret.length).toBeDefined();
  });

  describe('.solved', function() {
    it('should query with solved param', function() {
      $httpBackend.expectGET(API_BASE + '/problems?solved=true').respond([]);
      problems.solved();
      $httpBackend.flush();
    });

    it('should filter request while not implemented server side', function() {
      $httpBackend.expectGET(API_BASE + '/problems?solved=true')
      .respond([{
        id:1,
        solved:true
      },
      {
        id:2,
        solved:false
      },
      {
        id:3
      }]);

      problems.solved().then(function(data) {
        ret = data;
      });

      $httpBackend.flush();
      expect(ret.length).toBe(1);
    });

    describe('.solved(false)', function() {
      it('should query with solved=false param', function() {
        $httpBackend.expectGET(API_BASE + '/problems?solved=false').respond([]);
        problems.solved(false);
        $httpBackend.flush();
      });

      it('should filter request while not implemented server side', function() {
        $httpBackend.expectGET(API_BASE + '/problems?solved=false')
        .respond([{
          id:1,
          solved:true
        },
        {
          id:2,
          solved:false
        },
        {
          id:3
        }]);

        problems.solved(false).then(function(data) {
          ret = data;
        });

        $httpBackend.flush();
        expect(ret.length).toBe(2);
      });
    });
  });
  

  it('should return an objects when getById is called', function() {
    var obj = {id: 1};
    $httpBackend.whenGET(API_BASE + '/problems/' + obj.id).respond(obj);
    problems.getById(obj.id).then(function(data) {
      ret = data;
    });
    $httpBackend.flush();
    expect(ret.id).toEqual(1);
  });

  it('should send post request with new problem data when create is called', function() {
    var payload, result;

    $httpBackend.expectPOST(API_BASE + '/problems').respond(function() {
      payload = JSON.parse(arguments[2]);
      payload.id = 1;
      return [200, payload];
    });

    problems.create({title: 'foo', description: 'bar'}).then(function(data) {
      result = data;
    });

    $httpBackend.flush();
    expect(payload.title).toBe('foo');
    expect(payload.description).toBe('bar');

    expect(result.id).toBe(1);
    expect(result.title).toBe('foo');
    expect(result.description).toBe('bar');
  });

  // Todo: Move to Question Factory
  /*
  it('should return an objects when answer is posted', function() {
    var obj = {id: 1}, ans = !!Math.floor(Math.random() * 2);
    $httpBackend.whenPOST(API_BASE + '/problems/' + obj.id).respond({isCorrect: ans});
    problems.answer(obj.id, {}).then(function(data) {
      ret = data.isCorrect;
    });
    $httpBackend.flush();
    expect(ret).toEqual(ans);
  });
*/
});