describe('TopicsEditCtrl', function() {
  beforeEach(module('app.homePages'));
  beforeEach(module('app.topics'));

  var associationCtrl,
  $scope;
  beforeEach(inject(function($controller,$rootScope){
    $scope = $rootScope.$new();
    associationCtrl =
    function(topic,videos,save){
      return $controller('TopicsEditCtrl',
      {
        $scope:$scope,
        topic:topic,
        videos:videos,
        save:save
      });
    };
  }));

  it('should update scope with topic and videos', function() {
    var topic = {id:1};

    expect(associationCtrl(topic,[{id:10}],null)).toBeDefined();
    expect($scope.topic.id).toBe(1);
    expect($scope.videos[0]).toEqual({id:10});
  });


  describe('adding videos to topic', function() {
    var videosList;

    beforeEach(function(){
      videosList = [{
        id:1,
        name:"v"
      },
      {
        id:10,
        name:"v2"
      },
      {
        id:23,
        name:"v3"
      }];
    });


    it('should add video to topic.video',function(){
      var topic = {id:1};
      var ctrl = associationCtrl({id:1},[],null);

      $scope.addVideo(topic,videosList[0]);
      $scope.addVideo(topic,videosList[1]);
      expect(topic.videos.length).toBe(2);
    });

    it('should ignore adding video with same id',function(){
      var topic = {id:1};
      var ctrl = associationCtrl(
        {
          id:1,
          videos:[videosList[0]]
        },
        [],
        null);

      $scope.addVideo($scope.topic,videosList[0]);
      expect($scope.topic.videos.length).toBe(1);
    });
  });
});