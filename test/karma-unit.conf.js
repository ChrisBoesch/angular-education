module.exports = function(config) {
  config.set({
    files: [
      'bower_components/jquery/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/spin.js/spin.js',
      'bower_components/spin.js/jquery.spin.js',
      'app/scripts/config.js',
      'app/scripts/homePages.js',
      'app/scripts/app.js',
      'test/unit/**/*.js'
    ],
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
};
