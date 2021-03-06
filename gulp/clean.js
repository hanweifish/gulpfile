;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var del = require('del');

    module.exports = function(config) {

        /**
         * Delete .tmp and dist/
         */
        gulp.task('clean', function(done) {

            del([
                config.tmp,
                config.dist
            ], done);

        });

    }

}());
