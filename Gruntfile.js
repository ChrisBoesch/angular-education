var files = require('./ngEducationFiles').files;

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    localhostUrl:'0.0.0.0',
    shell: {
      options: {
        stdout: true
      },
      selenium: {
        command: './selenium/start',
        options: {
          stdout: false,
          async: true
        }
      },
      protractor_install: {
        command: 'node ./node_modules/protractor/bin/webdriver-manager update'
      },
      npm_install: {
        command: 'npm install'
      }
    },

    connect: {
      options: {
        base: 'app/'
      },
      webserver: {
        options: {
          port: 8888,
          keepalive: true
        }
      },
      devserver: {
        options: {
          hostname: '0.0.0.0',
          port: 8888,
          middleware: function(connect, options) {
            var middlewares = [];
            var directory = options.directory || options.base[options.base.length - 1];
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            // Setup the proxy
            middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

            options.base.forEach(function(base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });

            // Make directory browse-able.
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        },
        proxies: [
          {
            context: '/api/v1/content-delivery',
            host: '<%= localhostUrl %>',
            port: 9090,
            changeOrigin: true,
            xforward: true,
            rewrite: {
              '^/api/v1/content-delivery': ''
            }
          }
        ]
      },
      testserver: {
        options: {
          port: 9999
        }
      },
      coverage: {
        options: {
          base: 'coverage/',
          port: 5555,
          keepalive: true
        }
      },
      screenshots: {
        options: {
          base: 'screenshots/',
          port: 5556,
          keepalive: true
        }
      }
    },

    express: {
      options: {
        // Override defaults here
      },
      api: {
        options: {
          script: 'api/server.js'
        }
      }
    },

    protractor: {
      options: {
        keepAlive: true,
        configFile: "./test/protractor.conf.js"
      },
      singlerun: {},
      auto: {
        keepAlive: true,
        options: {
          args: {
            seleniumPort: 4444
          }
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/scripts/{,*/}*.js'
      ]
    },

    concat: {
      styles: {
        dest: './app/assets/app.css',
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/bootstrap/dist/css/bootstrap-theme.css',
          'bower_components/video.js/video-js.css',
          'app/styles/app.css',
          //place your Stylesheet files here
          'app/styles/bootstrap-theme.css'
        ]
      },
      scripts: {
        options: {
          separator: ';'
        },
        dest: './app/assets/app.js',
        src: files.indexFiles
      }
    },

    copy: {
      fontAwesome: {
        src: 'bower_components/bootstrap/dist/fonts/*',
        dest: 'app/fonts/',
        expand: true,
        flatten: true
      },
      videoJS: {
        src: 'bower_components/video.js/font/*',
        dest: 'app/assets/font/',
        expand: true,
        flatten: true
      }
    },

    watch: {
      options: {
        livereload: 7777
      },
      assets: {
        files: ['app/styles/**/*.css', 'app/scripts/**/*.js'],
        tasks: ['concat']
      },
      templates: {
        files: ['app/templates/**/*.html']
      },
      protractor: {
        files: ['app/scripts/**/*.js', 'test/e2e/**/*.js'],
        tasks: ['protractor:auto']
      }
    },

    open: {
      devserver: {
        path: 'http://0.0.0.0:8888'
      },
      coverage: {
        path: 'http://0.0.0.0:5555'
      },
      screenshots: {
        path: 'http://0.0.0.0:5556'
      }
    },

    karma: {
      unit: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: 'dots'
      },
      unit_auto: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: true,
        singleRun: false
      },
      unit_coverage: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/scripts/*.js': ['coverage'],
          '**/*.html': 'ng-html2js'
        },
        coverageReporter: {
          type: 'html',
          dir: 'coverage/'
        }
      }
    },

    autoshot: {
      default_options: {
        options: {
          path: 'screenshots/',
          remote: {
            files: [
              {
                src: 'http://<%= localhostUrl %>:8888/#/',
                dest: 'videos.jpg',
                delay: 1000
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/problems',
                dest: 'problems.jpg'
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/videos/2',
                dest: 'videos-details.jpg',
                delay: 500
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/problems/1',
                dest: 'problem-details.jpg',
                delay: 300
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/videos/create',
                dest: 'videos-create.jpg'
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/problems/create',
                dest: 'problems-create.jpg'
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/problems/1/edit',
                dest: 'problems-edit.jpg'
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/topics',
                dest: 'topics-list.jpg'
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/topics/1/edit',
                dest: 'topic-edit.jpg'
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/topics/create',
                dest: 'topic-create.jpg'
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/topics/1',
                dest: 'topic-view.jpg'
              },
              {
                src: 'http://<%= localhostUrl %>:8888/#/courses/',
                dest: 'courses-list.jpg'
              },
            ]
          },
          local: false,
          viewport: ['1024x768','320x568','768x1024']
        }
      }
    },
    
    compress: {
      screenshots: {
        options: {
          archive: 'screenshots/screenshots.zip'
        },
        files: [{
          expand: true,
          src: ['screenshots/*.jpg'],
          dest: '/'
        }]
      }
    }

  });

  //single run tests
  // Removing this initially until protractor approach better understood
  //grunt.registerTask('test', ['jshint','test:unit', 'test:e2e']);
  grunt.registerTask('test', ['jshint', 'test:unit']);
  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:e2e', ['connect:testserver', 'protractor:singlerun']);

  //autotest and watch tests
  grunt.registerTask('autotest', ['karma:unit_auto']);
  grunt.registerTask('autotest:unit', ['karma:unit_auto']);
  grunt.registerTask('autotest:e2e', ['connect:testserver', 'shell:selenium', 'watch:protractor']);

  //coverage testing
  grunt.registerTask('test:coverage', ['karma:unit_coverage']);
  grunt.registerTask('coverage', ['karma:unit_coverage', 'open:coverage', 'connect:coverage']);

  //screenshots
  grunt.registerTask('screenshots', ['express:api', 'configureProxies:devserver',
    'connect:devserver', 'autoshot', 'compress:screenshots', 'connect:screenshots', 'open:screenshots']);

  //installation-related
  grunt.registerTask('install', ['update', 'shell:protractor_install']);
  grunt.registerTask('update', ['shell:npm_install', 'concat', 'copy']);

  //defaults
  grunt.registerTask('default', ['dev']);

  //development
  grunt.registerTask('dev', ['update', 'express:api', 'configureProxies:devserver',
    'connect:devserver', 'watch:assets', 'watch:templates']);

  //server daemon
  grunt.registerTask('serve', ['connect:webserver']);
};
