;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var runSequence = require('run-sequence');
    var util = require('util');

    module.exports = function(config) {

        /**
         * Watch task
         */
        gulp.task('watch', function() {

            var watchTasks = [
                'scss',
                'javascript',
                'index.html',
                'templateCache',
                'bower',
                'env'
            ];

            generateWatchers(watchTasks);

        });

        gulp.task('watch:webpack', function() {

            var watchTasks = [
                'scss',
                'webpack',
                'index.html',
                'templateCache',
                'bower'
            ];

            generateWatchers(watchTasks);

        });

        /**
         * Calls gulp-watch functions based on names of watchers passed in
         *
         * @param {String[]} strArr - Names of watchers to use
         */
        function generateWatchers(strArr) {

            var i;
            for (i = 0; i<strArr.length; i++) {
                if (typeof strArr[i] !== 'string') continue;
                if (watchers[strArr[i]] === undefined) continue;

                watchers[strArr[i]]();
            }

        }

        /**
         * gulp-watch functions
         *
         * @namespace
         */
        var watchers = {

            'scss': function() {
                // watch .scss
                $.watch([
                    config.src + '/**/*.scss'
                ], function(e) {
                    if (e.type === 'changed') {
                        gulp.start('styles');
                    } else {
                        runSequence('styles', 'inject');
                    }
                });
            },

            'javascript': function() {

                // watch .js
                $.watch([
                    config.src + '/**/*.js'
                ], function(e) {
                    if (e.type === 'changed') {
                        gulp.start('javascript');
                    } else {
                        runSequence('javascript', 'inject');
                    }
                });

            },

            'webpack': function() {

                $.watch([
                    config.src + '/**/*.js',
                    config.src + '/**/*.jsx'
                ], function(e) {
                    runSequence('webpack', 'inject');
                });

            },

            'index.html': function() {

                // index.html
                $.watch([
                    config.src + '/*.html'
                ], function(e) {
                    runSequence('inject:moveindex', 'inject');
                });

            },

            'templateCache': function() {

                // template cache
                $.watch([
                    config.src + '/**/*.tpl.html'
                ], function(e) {
                    runSequence('inject');
                });

            },

            'bower': function() {

                // bower.json
                $.watch([
                    'bower.json'
                ], function(e) {
                    gulp.start('inject');
                });

            },

            'env': function() {

                $.watch([
                    'config.json'
                ], function(e) {
                    runSequence('env', 'javascript', 'inject');
                });

            }

        }

    }

}());
