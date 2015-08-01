;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var browserSyncSpa = require('browser-sync-spa');

    module.exports = function(config) {

        gulp.task('others', ['assets', 'images'], function() {
            browserSync.reload();
        });
        
        /**
         * Moves assets to .tmp
         */
        gulp.task('assets', function() {
            var otherFiles = gulp.src([
                config.src + '/**/*.*',
                '!' + config.src + '/**/*.{css,html,js,scss}',
                '!' + config.src + '/images/*'
            ]);

            return otherFiles
                .pipe(gulp.dest(config.tmp));
        });

        /**
         * Moves images to .tmp
         */
        gulp.task('images', function() {
            var imageFiles = gulp.src([
                config.src + '/images/**/*.*'
            ]);

            return imageFiles
                .pipe(gulp.dest(config.tmp + '/images'));
        });

    }


}());
