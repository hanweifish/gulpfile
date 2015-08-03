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
         * Inject into .tmp/index.html
         * bower wiredep
         */
        gulp.task('inject', function(done) {
            runSequence('inject:default', 'inject:templateCache', done);
        });

        gulp.task('inject:moveindex', function() {

            return gulp.src([
                    config.src + '/*.html'
                ])
                .pipe(gulp.dest(config.tmp));

        });

        gulp.task('inject:default', function() {

            var index = gulp.src([
                config.tmp + '/*.html'
            ]);

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

        gulp.task('inject:templateCache', function() {

            var partialsInjectFile = gulp.src(config.tmp + '/partials/templateCacheHtml.js', {read:false});
            var partialsInjectOptions = {
                starttag: '<!-- inject:partials -->',
                ignorePath: config.tmp,
                addRootSlash: false
            };

            return gulp.src([
                    config.tmp + '/*.html'
                ])
                .pipe($.inject(partialsInjectFile, partialsInjectOptions))
                .pipe(gulp.dest(config.tmp))
                .pipe(browserSync.reload({stream: true}));

        });

    }

}());
