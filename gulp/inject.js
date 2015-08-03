;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var wiredep = require('wiredep').stream;

    module.exports = function(config) {
        
        /**
         * Inject into .tmp/index.html
         * bower wiredep
         */
        gulp.task('inject', function() {
            var index = gulp.src([
                config.tmp + '/*.html'
            ]);

            // there should be only one js file in .tmp, compiled from javascript task
            var jsFiles = gulp.src([
                config.tmp + '/**/*.js'
            ], {read: false});

            // there should only be one css file in .tmp, compiled from styles task
            var cssFiles = gulp.src([
                config.tmp + '/**/*.css'
            ], {read: false});

            var injectOpts = {
                ignorePath: [config.tmp],
                addRootSlash: false
            };

            var wiredepOpt = {
                directory: 'bower_components'
            };

            return index
                .pipe($.inject(jsFiles, injectOpts))
                .pipe($.inject(cssFiles, injectOpts))
                .pipe(wiredep(wiredepOpt))
                .pipe(gulp.dest(config.tmp))
                .pipe(browserSync.reload({stream: true}));
        });

        gulp.task('inject:moveindex', function() {
            return gulp.src([
                    config.src + '/*.html'
                ])
                .pipe(gulp.dest(config.tmp));
        });

    }

}());
