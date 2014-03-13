describe('Create problem', function() {

  var ptor = protractor.getInstance();
  var createProblemUrl = '/#/problems/create';

  it('should support location',function () {
  	ptor.get(createProblemUrl);  	

  	expect(element(by.css('h2')).getText()).toBe('Not implemented');
  });

});