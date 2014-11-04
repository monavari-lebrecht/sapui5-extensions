/*global module:false*/
module.exports = function (grunt) {

    /**
     * returns object with key representing the release filename and value representing the debug filename
     */
    var getDebugFiles = function () {
        var detectedFiles = {};
        var observedFolders = ['./', 'ui/'];

        var iterateOverDirectoryCallback = function (directory) {
            var files = require('fs').readdirSync(directory);
            var regex = /(.*)-dbg\.(.*)/;
            files.forEach(function (filename) {
                if ((directory + filename).match(regex)) {
                    detectedFiles[directory + filename.replace(regex, '$1.$2')] = directory + filename;
                }
            });
        };
        observedFolders.forEach(iterateOverDirectoryCallback);

        return detectedFiles;
    };

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

            gruntfile  : {
                src: "Gruntfile.js"
            }
        },

        uglify: {
            options: {
                compress: {
                    global_defs: {
                        "DEBUG": false
                    },
                    dead_code  : true
                }
            },
            'sapui5-extensions': {
                files: getDebugFiles()
            }
        },

        qunit: {
            all: {
                src: ["test/**/*.html"]
            }
        },

        watch: {
            gruntfile : {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:gruntfile"]
            },
            uglify    : {
                files: ["ui/**/*-dbg*.js", "!./node_modules/**", "!./bower_components/**"],
                tasks: ["uglify"]
            },
            jshint    : {
                files: ["ui/**/*-dbg*.js", "!./node_modules/**", "!./bower_components/**"],
                tasks: ["jshint"]
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", ["jshint", "qunit:all", "watch"]);
};
