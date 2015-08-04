;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var browserSyncSpa = require('browser-sync-spa');

    module.exports = function(config) {

        gulp.task('others', ['assets', 'images'], function() {
            browserSync.reload({stream:true});
        });
        
        /**
         * Moves assets to dist/
         */
        gulp.task('assets', function() {

            var otherFiles = gulp.src([
                config.src + '/**/*.*',
                '!' + config.src + '/**/*.{css,html,js,scss}',
                '!' + config.src + '/images/*'
            ]);

            return otherFiles
                .pipe(gulp.dest(config.dist));

        });

        /**
         * Moves images to dist/
         */
        gulp.task('images', function() {

            var imageFiles = gulp.src([
                config.src + '/images/**/*.*'
            ]);

            var imageminOpts = {
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            };

            return imageFiles
                .pipe($.cache($.imagemin(imageminOpts)))
                .pipe(gulp.dest(config.dist + '/images'))

        });

    }


}());
