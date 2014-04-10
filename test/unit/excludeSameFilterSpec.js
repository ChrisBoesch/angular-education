describe('excludeSameFilter', function() {
  beforeEach(module('myApp'));

  var excludeSameFilter;

  beforeEach(inject(function(_excludeSameFilter_){
    excludeSameFilter = _excludeSameFilter_;
  }));

  it('should work on empty colleciton', function() {
    var output = excludeSameFilter([{id:1}],null);
    expect(output).toEqual([{id:1}]);
  });

  it('should return items not existing in argument', function() {
    var coll = [{id:1},{id:10}]
    var input = coll.concat([{id:3}]);

    var output = excludeSameFilter(input,coll);

    expect(output).toEqual([{id:3}]);
  });
});