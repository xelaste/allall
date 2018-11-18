// Karma configuration
// Generated on Wed Aug 10 2016 22:07:33 GMT+0300 (IDT)
const path = require('path');

var webpackConfig = {};
webpackConfig.devtool = 'inline-source-map';
webpackConfig.mode="development";

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'spec/tests.bundle.js',
      'src/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/tests.bundle.js': ['webpack','sourcemap' ],
      'src/**/*.js': ['webpack','sourcemap','coverage']
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha','progress', 'kjhtml', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
   // browsers: ['Chrome'],
    //chromeOptions: {
    //  args: [ "--headless", "--disable-gpu", "--window-size=800x600" ]
    //},
    

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
        ],
      }
    },
    
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
