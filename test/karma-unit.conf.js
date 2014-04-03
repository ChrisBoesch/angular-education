var ngEducationFiles = require('../ngEducationFiles');

module.exports = function(config) {
  config.set({
    files: ngEducationFiles.mergeFilesFor('karmaUnit'),
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['dots'],
    preprocessors: {
      '**/*.html': 'ng-html2js'
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
};
