describe('ProblemListCtrl', function() {

  beforeEach(module('app.problems'));
  beforeEach(module('app.homePages'));

  var ctrl, $scope, location,deferred, problems;

  beforeEach(inject(function(_$q_, _$location_,_problems_) {     
    deferred = _$q_.defer();    
    problems = _problems_;
    location = _$location_;
    spyOn(problems, 'all').andReturn(deferred.promise);
  }));

  describe('Problem List Controller: without resolve', function() {

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      ctrl = _$controller_('ProblemListCtrl', {
        $scope: $scope,
        problems:problems
      });
    }));

    describe('Initialization', function() {
      it('should instantiate problems to null', function() {
        expect($scope.problems).toBeNull();
      });
      it('should call the all function in factory', function() {
        expect(problems.all).toHaveBeenCalled();
      });
    });
    describe('After factory resolved', function() {

      it('should update the problems with content from factory', function() {
        var problems = [1, 2, 3];
        deferred.resolve(problems);
        $scope.$apply();
        expect($scope.problems).toEqual(problems);
      });
    });
  });

  describe('Problem List Controller: problems resolved in route', function() {
    var problemsList = [{id:1}];

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      ctrl = _$controller_('ProblemListCtrl', {
        $scope: $scope,
        problems:problemsList
      });
    }));

    it('should copy input to scope.problems', function() {
      expect($scope.problems).toEqual(problemsList);
    })
  });

  describe('OtherControllers', function() {
    var questions,
    videos,
    question;

    beforeEach(inject(function(_questions_,_videos_,_question_){
      questions = _questions_;
      videos = _videos_;
      question = _question_;
      spyOn(videos, 'all').andReturn(deferred.promise);
      spyOn(videos, 'getById').andReturn(deferred.promise);
      spyOn(problems, 'getById').andReturn(deferred.promise);
      spyOn(problems, 'create').andReturn(deferred.promise);
      spyOn(questions, 'answer').andReturn(deferred.promise);
    }));
    describe('Problem Controller', function() {
      // Generate a random id between 0~100
      var routeParamId = (Math.random() * 100).toFixed(0);

      beforeEach(inject(function(_$controller_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        ctrl = _$controller_('ProblemCtrl', {
          $scope: $scope,
          $routeParams: {
            id: routeParamId
          }
        });
      }));

      describe('Initialization', function() {

        it('should instantiate id to the given routeParam id', function() {
          expect($scope.id).toEqual(routeParamId);
        });

        it('should instantiate title to null', function() {
          expect($scope.title).toBeNull();
        });

        it('should call the getById function in factory', function() {
          expect(problems.getById).toHaveBeenCalledWith(routeParamId);
        });

      });

      describe('After factory resolved', function() {

        it('should update the title with content from factory', function() {
          var title = 'awesome video';
          deferred.resolve({title: title, questions: []});
          $scope.$apply();
          expect($scope.title).toEqual(title);
        });

        it('should call the set function on question factory', function() {
          var data = [1, 2, 3];
          spyOn(question, 'set').andCallThrough();
          deferred.resolve({questions: data});
          $scope.$apply();
          expect(question.set).toHaveBeenCalledWith(data);
        });

        it('should invoke the callback after the data has been set', function() {
          var data = [1, 2, 3];
          deferred.resolve({questions: data});
          $scope.$apply();
          expect($scope.question).toEqual(data[0]);
          expect($scope.total).toEqual(data.length);
          expect($scope.position).toEqual(1);
        });

      });

      describe('Methods', function() {

        describe('currentClass', function() {

          it('should return warning on undefined', function() {
            var question = {};
            expect($scope.currentClass('test', question)).toEqual('test-warning');
          });

          it('should return warning on undefined', function() {
            $scope.question = {};
            expect($scope.currentClass('test')).toEqual('test-warning');
          });

          it('should return success on true', function() {
            var question = {isCorrect: true};
            expect($scope.currentClass('test', question)).toEqual('test-success');
          });

          it('should return success on true', function() {
            $scope.question = {isCorrect: true};
            expect($scope.currentClass('test')).toEqual('test-success');
          });

          it('should return danger on false', function() {
            var question = {isCorrect: false};
            expect($scope.currentClass('test', question)).toEqual('test-danger');
          });

          it('should return danger on false', function() {
            $scope.question = {isCorrect: false};
            expect($scope.currentClass('test')).toEqual('test-danger');
          });

        });

        describe('next', function() {

          it('should invoke the next function on question', function() {
            spyOn(question, 'next').andCallThrough();
            $scope.next();
            expect(question.next).toHaveBeenCalled();
          });

        });

        describe('submit', function() {

          var answer = 6;

          it('should expect isAnswered to true', function() {
            $scope.question = {answer: answer};
            $scope.submit();
            expect($scope.isAnswered).toBeTruthy();
          });

          it('should expect canProceed to true', function() {
            $scope.question = {answer: answer};
            $scope.submit();
            expect($scope.canProceed).toBeTruthy();
          });

          it('should invoke the answer function on problems', function() {
            $scope.id = 20;
            $scope.question = {id: 5, answer: answer};
            $scope.submit();
            expect(questions.answer).toHaveBeenCalledWith(
              {problemId: 20, questionId: 5, answer: 6}
            );
          });

          it('shouldn\'t invoke the answer function on problems if answer is not defined', function() {
            $scope.question = {};
            $scope.submit();
            expect(questions.answer).not.toHaveBeenCalled();
          });

          // TODO: Fix this
          /*
           it('should invoke the success callback on successful request', function() {
           var ans = !!Math.floor(Math.random() * 2);
           $scope.question = {id: 5, answer: answer};
           $scope.$apply();
           deferred.resolve({isCorrect: ans});
           $scope.submit();
           expect($scope.question.isCorrect).toEqual(ans);
           expect($scope.canProceed).toBeFalsy();
           });
           */

        });

      });

    });

    describe('ProblemCreateCtrl', function(){

      beforeEach(inject(function(_$controller_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        ctrl = _$controller_('ProblemCreateCtrl', {
          $scope: $scope,
          $location: location,
          problems: problems
        });
      }));

      it('should create a new problem', function() {
        expect($scope.savingProblem).toBe(false);

        $scope.create({title: 'foo', description: 'bar'});
        expect(problems.create).toHaveBeenCalledWith(
          {title: 'foo', description: 'bar'}
        );
        expect($scope.savingProblem).toBe(true);

        deferred.resolve({id: 1, title: 'foo', description: 'bar'});

        $scope.$digest();
        expect(location.path()).toBe('/problems');
        expect($scope.savingProblem).toBe(false);
      });
    });

    describe('ProblemEdit Controller', function() {
      // Generate a random id between 0~100
      var questionDeferred,
        videoDeferred,
        allVideosDeffered,
        problemData,
        attachDeffered,
        routeParamId = (Math.random() * 100).toFixed(0);

      beforeEach(inject(function(_$controller_, _$rootScope_, _$q_) {
        questionDeferred = _$q_.defer();
        videoDeferred = _$q_.defer();
        allVideosDeffered = _$q_.defer();
        attachDeffered = _$q_.defer();
        spyOn(questions, 'add').andReturn(questionDeferred.promise);
        spyOn(videos, 'getByProblemId').andReturn(videoDeferred.promise);
        spyOn(videos, 'attach').andReturn(attachDeffered.promise);
        videos.all.andReturn(allVideosDeffered.promise);

        problemData = {id:routeParamId, title:'t', questions: []};
        deferred.resolve(problemData);

        $scope = _$rootScope_.$new();
        ctrl = _$controller_('ProblemEditCtrl', {
          $scope: $scope,
          $routeParams: {
            id: routeParamId
          }
        });
      }));

      it('should save problem to scope',function(){
        $scope.$digest();
        expect($scope.problem).toEqual(problemData);
      });

      it('should save question', function() {
        var questionDef = {
            title: 'Undefined is ___',
            options: ['Truthy', 'Falsy'],
            validAnswer: 'Falsy'
          },
          question = {
            id: 1,
            title: 'Undefined is ___',
            options: [
              {
                id: 1,
                value: 'Truthy'
              },
              {
                id: 2,
                value: 'Falsy'
              }
            ],
            validAnswer: 2
          };
        $scope.$digest();

        $scope.showNewQuestionForm = true;
        $scope.addQuestion($scope.problem, questionDef);
        expect($scope.problem.questions.length).toBe(0);

        questionDeferred.resolve(question);
        $scope.$digest();
        expect($scope.showNewQuestionForm).toBe(false);
        expect($scope.problem.questions.length).toBe(1);
        expect($scope.problem.questions[0]).toEqual(question);
      });

      it('should fetch the video the problem is attached to',function(){
        $scope.$digest();

        expect(videos.getByProblemId).toHaveBeenCalledWith({id: routeParamId});
        videoDeferred.resolve([]);
        $scope.$digest();
        expect($scope.video).not.toBeDefined();
      });

      it('should save the video the problem is attached to',function(){
        var video = {
            id: 1,
            title: 'Introduction to JavaScript',
            problemId: routeParamId
          };

        $scope.$digest();

        videoDeferred.resolve([video]);

        $scope.$digest();
        expect($scope.video).toEqual(video);
      });

      it('should get all videos',function(){
        var video = {
            id: 1,
            title: 'Introduction to JavaScript',
            problemId: routeParamId
          };

        allVideosDeffered.resolve([video]);
        $scope.$digest();

        expect($scope.videos).toEqual([video]);
      });

      it('should attach video to problem', function() {
        var video = {
            id: 1,
            title: 'Introduction to JavaScript',
            problemId: routeParamId
          };

        $scope.$digest();

        $scope.attachVideo(video, $scope.problem);
        expect(videos.attach).toHaveBeenCalledWith(video, $scope.problem);

        attachDeffered.resolve({});
        $scope.$digest();

        expect($scope.video).toEqual(video);
      });

    });
  });
});
