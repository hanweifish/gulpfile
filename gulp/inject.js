;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');

    module.exports = function(config) {
        
        /**
         * Inject into .tmp/index.html
         */
        gulp.task('inject', function() {
            var index = gulp.src([
                config.src + '/*.html'
            ]);

            var jsFiles = gulp.src([
                config.tmp + '/**/*.js'
            ], {read: false});

            var cssFiles = gulp.src([
                config.tmp + '/**/*.css'
            ], {read: false});

            var injectOpts = {
                ignorePath: [config.tmp],
                addRootSlash: false
            };

            return index
                .pipe($.inject(jsFiles, injectOpts))
                .pipe($.inject(cssFiles, injectOpts))
                .pipe(gulp.dest(config.tmp))
                .pipe(browserSync.reload({stream: true}));
        });

    }

}());
