var _ = require('lodash');

var questions = [
  {
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
  },
  {
    id: 2,
    title: 'Please choose the correct answer?',
    options: [
      {
        id: 3,
        value: 'null === false'
      },
      {
        id: 4,
        value: 'null == undefined'
      },
      {
        id: 5,
        value: 'null === undefined'
      },
      {
        id: 6,
        value: 'NaN === NaN'
      }
    ],
    validAnswer: 4
  }
];

var problems = [
  {
    id: 1,
    title: 'Introduction to JavaScript',
    description: 'Instruction or some useful hints',
    questionsRef: [1, 2]
  },
  {
    id: 2,
    title: 'Introduction to AngularJS',
    description: 'Instruction or some useful hints',
    questionsRef: []
  }
];

exports.getAll = function() {
  return _.map(problems, function(problem) {
    return _.pick(problem, ['id', 'title', 'description']);
  });
};

exports.getById = function(id) {
  var problem = _.find(problems, {id: id});
  if (problem) {
    problem.questions = _.chain(questions)
      .filter(function(question) {
        return problem.questionsRef.indexOf(question.id) > -1;
      })
      .map(function(question) {
        return _.pick(question, ['id', 'title', 'options', 'answered', 'isCorrect']);
      })
      .value();
    return _.pick(problem, ['id', 'title', 'description', 'questions']);
  }
};

exports.add = function(newProblem) {
  if (!newProblem || !newProblem.title || !newProblem.description) {
    return;
  }
  newProblem.id = problems.length + 1;
  newProblem.questionsRef = [];
  problems.push(newProblem);

  return _.pick(newProblem, ['id', 'title', 'description', 'questions']);
};

exports.postAnswer = function(id, answer) {
  var question = _.find(questions, {id: id});
  if (question) {
    if (!question.answered) {
      question.answered = answer;
      question.isCorrect = (question.validAnswer === answer);
    }
    return {
      isCorrect: question.isCorrect,
      answered: question.answered
    };
  }
};
