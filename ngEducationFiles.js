// Add all your files here

var ngEducationFiles = {

  indexFiles: [
    'bower_components/lodash/dist/lodash.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-spinkit/build/angular-spinkit.js',
    'bower_components/video.js/video.dev.js',
    'bower_components/videojs-youtube/src/media.youtube.js',
    'app/scripts/**/*Module.js',
    'app/scripts/**/*.js'
  ],

  uniTestFiles: [
    'bower_components/angular-mocks/angular-mocks.js',
    'test/unit/**/*.js',
    'app/templates/*.html'
  ],

  karmaUnit: [
    '@indexFiles',
    '@uniTestFiles'
  ]

};

if (exports) {
  exports.files = ngEducationFiles;
  exports.mergeFilesFor = function() {
    var files = [];

    Array.prototype.slice.call(arguments, 0).forEach(function(filegroup) {
      ngEducationFiles[filegroup].forEach(function(file) {
        // replace @ref
        var match = file.match(/^\@(.*)/);
        if (match) {
          files = files.concat(ngEducationFiles[match[1]]);
        } else {
          files.push(file);
        }
      });
    });

    return files;
  };
}
