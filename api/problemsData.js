var _ = require('lodash');

var problems = [
  {
    id: 1,
    title: 'Introduction to JavaScript',
    description: 'Instruction or some useful hints',
    questions: [
      {
        id: 1,
        title: 'Undefined is ___',
        options: ['Truthy', 'Falsy']
        //answer: 1,
        //isCorrect: true
      },
      {
        id: 2,
        title: 'Please choose the correct answer?',
        options: [
          'null === false',
          'null == undefined',
          'null === undefined',
          'NaN === NaN'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Introduction to AngularJS',
    description: 'Instruction or some useful hints'
  }
];

exports.getAll = function() {
  return _.map(problems, function(problem) {
    return _.pick(problem, ['id', 'title', 'description']);
  });
};

exports.getById = function(id) {
  return _.pick(_.find(problems, {id: id}), ['id', 'title', 'description']);
};

exports.getAllQuestionsById = function(id) {
  return _.find(problems, {id: id}).questions;
};
