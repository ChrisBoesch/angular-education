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
