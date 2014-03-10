describe('Edit problem', function() {

  var ptor = protractor.getInstance();
  var editProblemUrl = '/#/problems/1/edit';

  it('should support location',function () {
  	ptor.get(editProblemUrl);  	

  	expect(element(by.css('h2')).getText()).toContain('Edit problem');
  });

});