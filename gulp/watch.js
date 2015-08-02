;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var runSequence = require('run-sequence');

    module.exports = function(config) {
        
        /**
         * Watch task
         */
        gulp.task('watch', function() {

            // watch scss
            gulp.watch([
                config.src + '/**/*.scss'
            ], function(e) {
                if (e.type === 'changed') {
                    gulp.start('styles');
                } else {
                    runSequence('styles', 'inject');
                }
            });

            // watch js
            gulp.watch([
                config.src + '/**/*.js'
            ], function(e) {
                if (e.type === 'changed') {
                    gulp.start('javascript');
                } else {
                    runSequence('javascript', 'inject');
                }
            });

            // watch html
            gulp.watch([
                config.src + '/**/*.html'
            ], function(e) {
                gulp.start('inject');
            });

        });

    }

}());
