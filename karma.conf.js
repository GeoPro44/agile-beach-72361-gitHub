// Karma configuration
// Generated on Wed Jun 01 2016 17:37:40 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'phantomjs-shim'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-route/angular-route.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-sanitize/angular-sanitize.js',
	  './node_modules/angular-mocks/angular-mocks.js',
	  './node_modules/underscore/underscore.js',
      './dist/js/main.min.js',
      './tests/HomeController.spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },	
	
	//reporters: ['progress'],
	reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome'],
	browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}



// links 
// http://code.ciphertrick.com/2015/08/03/angularjs-unit-testing-tutorial-karma-jasmine/