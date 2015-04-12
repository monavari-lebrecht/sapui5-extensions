/*global module:false, require:false*/
"use strict";

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		jshint: {
			options: {
				"devel"  : true,
				"curly"  : true,
				"eqeqeq" : true,
				"immed"  : true,
				"latedef": true,
				"newcap" : true,
				"noarg"  : true,
				"sub"    : true,
				"undef"  : true,
				"unused" : true,
				"boss"   : true,
				"eqnull" : true,
				"browser": true,
				"globals": {
					"jQuery": true,
					"sap"   : true,
					"$"     : true,
					"util"  : true,
					"view"  : true,
					"model" : true
				}
			},

			gruntfile: {
				src: "Gruntfile.js"
			}
		},

		uglify: {
			options            : {
				compress: {
					global_defs: {
						"DEBUG": false
					},
					dead_code  : true
				}
			},
			'sapui5-extensions': {
				files: grunt.file.expandMapping(['src/**/*.js'], null, {
					rename: function (destBase, srcPath) {
						return srcPath.replace('-dbg', '')
					}
				})
			}
		},

		qunit: {
			all: {
				src: ["test/**/*.html"]
			}
		},

		watch: {
			gruntfile: {
				files: "<%= jshint.gruntfile.src %>",
				tasks: ["jshint:gruntfile"]
			},
			uglify   : {
				files: ["src/**/*-dbg*.js", "!./node_modules/**", "!./bower_components/**"],
				tasks: ["uglify"]
			},
			jshint   : {
				files: ["src/**/*-dbg*.js", "!./node_modules/**", "!./bower_components/**"],
				tasks: ["jshint"]
			}
		},

		connect: {
			qunit: {
				options: {
					port: 9090,

					livereload: 35729,

					hostname : "localhost",
					base     : ".",
					keepalive: true
				}
			}
		}
	});

	// These plugins provide necessary tasks
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask("default", ["jshint", "qunit:all", "watch"]);
};
