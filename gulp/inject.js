;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var wiredep = require('wiredep').stream;
    var runSequence = require('run-sequence');

    module.exports = function(config) {

        /**
         * Inject all js from .tmp, css from .tmp, and bower into .tmp/index.html
         */
        gulp.task('inject', function(done) {

            // there should be only one js file in .tmp, compiled from javascript task
            var jsFiles = gulp.src([
                config.tmp + '/**/*.js',
                '!' + config.tmp + '/partials/**/*.js'
            ], {read: false});

            // there should only be one css file in .tmp, compiled from styles task
            var cssFiles = gulp.src([
                config.tmp + '/**/*.css'
            ], {read: false});

            var injectOpts = {
                ignorePath: [config.tmp],
                addRootSlash: false
            };

            var partialsInjectFile = gulp.src([
                config.tmp + '/partials/templateCacheHtml.js'
            ], {read:false});

            var partialOpts = {
                starttag: '<!-- inject:partials -->',
                ignorePath: config.tmp,
                addRootSlash: false
            };

            var wiredepOpts = {
                directory: 'bower_components'
            };

            return gulp.src([
                    config.tmp + '/*.html'
                ])
                .pipe($.inject(jsFiles, injectOpts))
                .pipe($.inject(cssFiles, injectOpts))
                .pipe($.inject(partialsInjectFile, partialOpts))
                .pipe(wiredep(wiredepOpts))
                .pipe(gulp.dest(config.tmp))
                .pipe(browserSync.reload({stream: true}));

        });

        /**
         * Move index.html from src to .tmp
         */
        gulp.task('inject:moveindex', function() {

            return gulp.src([
                    config.src + '/*.html'
                ])
                .pipe(gulp.dest(config.tmp));

        });

    }

}());
