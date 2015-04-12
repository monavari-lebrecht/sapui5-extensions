// Karma configuration
// Generated on Mon Nov 10 2014 18:39:40 GMT+0100 (CET)

module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath     : '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks   : ['qunit'],

		// list of files / patterns to load in the browser
		files        : [
			'test/bootstrap.js',
			'bower_components/openui5-bower/resources/sap-ui-core.js',
			'bower_components/openui5-bower/resources/sap/ui/thirdparty/qunit-dbg.js',
			'bower_components/openui5-bower/resources/sap/ui/qunit/qunit-dbg.js',
			'bower_components/openui5-bower/resources/sap/ui/qunit/QUnitUtils-dbg.js',
			'bower_components/openui5-bower/resources/sap/ui/thirdparty/sinon-dbg.js',
			'bower_components/openui5-bower/resources/sap/ui/thirdparty/sinon-qunit-dbg.js',
			'test/karma-module-paths.js',
			{
				pattern : 'bower_components/**/*.*',
				included: false
			},
			'src/**/*.js',
			{
				pattern : 'test/**/*.xml',
				included: false
			},
			'test/**/*.js'
		],

		// list of files to exclude
		exclude      : [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters    : ['progress'],

		// web server port
		port         : 9876,

		// enable / disable colors in the output (reporters and logs)
		colors       : true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel     : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch    : true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers     : ['PhantomJS_custom'],

		customLaunchers: {
			'PhantomJS_custom': {
				base: 'PhantomJS'
				//flags  : ['--remote-debugger-port=9000']
			}
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun      : false
	});
};
