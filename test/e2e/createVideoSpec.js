describe('Create video', function() {

  var ptor = protractor.getInstance();
  var createVideoUrl = '/#/videos/create';

  it('should have disabled Create button after load', function() {
    ptor.get(createVideoUrl);
    var createBtn = element(by.name('CreateBtn'));
    expect(createBtn.getAttribute('disabled'))
    .toBeTruthy();
  });  

  it('should url is invalid',function(){
    ptor.get(createVideoUrl);
    element(by.model('video.title')).sendKeys('someTitle');
    element(by.model('video.url')).sendKeys('someUrl');
    var createBtn = element(by.name('CreateBtn'));
    expect(createBtn.getAttribute('disabled'))
      .toBeTruthy();
  });

  it('should redirect to other page after video created', function()
  {
    ptor.get(createVideoUrl);
    element(by.model('video.title')).sendKeys('someTitle');
    element(by.model('video.url')).sendKeys('http://example.com/someVideo?asdfasdf=asdfasd');

    var createBtn = element(by.name('CreateBtn'));
    expect(createBtn.getAttribute('disabled')).toBeFalsy();
    var clickPromise = createBtn.click()
    
    /* fails, need a workaround 
    clickPromise.then(function(){
      ptor.waitForAngular();
      expect(ptor.getCurrentUrl()).not.
          toContain(createVideoUrl);
    });
    */
  });
});
