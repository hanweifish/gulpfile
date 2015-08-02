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

            // watch scss
            $.watch([
                config.src + '/**/*.scss'
            ], function(e) {
                console.log(util.inspect(arguments));
                if (e.type === 'changed') {
                    gulp.start('styles');
                } else {
                    runSequence('styles', 'inject');
                }
            });

            // watch js
            $.watch([
                config.src + '/**/*.js'
            ], function(e) {
                if (e.type === 'changed') {
                    gulp.start('javascript');
                } else {
                    runSequence('javascript', 'inject');
                }
            });

            // watch html
            $.watch([
                config.src + '/**/*.html'
            ], function(e) {
                gulp.start('inject');
            });

            // bower.json
            $.watch([
                'bower.json'
            ], function(e) {
                gulp.start('inject');
            });

        });

    }

}());
