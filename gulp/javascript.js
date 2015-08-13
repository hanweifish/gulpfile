;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var runSequence = require('run-sequence');
    var browserSync = require('browser-sync');
    var browserSyncSpa = require('browser-sync-spa');

    module.exports = function(config) {

        /**
         * compiles all javascript in src into .tmp/compiled.js
         */
        gulp.task('javascript', function() {

            var jsFiles = gulp.src([
                config.src + '/**/*.js'
            ])
            .pipe($.angularFilesort()).on('error', config.errorHandler('AngularFilesort'));

            return jsFiles
                .pipe($.sourcemaps.init())
                .pipe($.babel())
                .pipe($.concat('compiled.js'))
                .pipe($.sourcemaps.write('.'))
                .pipe(gulp.dest(config.tmp))
                .pipe(browserSync.reload({stream:true}));

        });

    }


}());
