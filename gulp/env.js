;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var env = process.env.ENV || 'dev';

    module.exports = function(config) {

        /**
         * builds env js file
         */
        gulp.task('env', function() {

            return gulp.src(config.configJson)
                .pipe($.ngConfig('env.config', {
                    environment: env
                }))
                .pipe(gulp.dest(config.src));

        });

    }

}());
