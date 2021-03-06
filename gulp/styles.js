(function() {
    'use strict';

    // Deps
    var gulp = require('gulp');
    var runSequence = require('run-sequence');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');

    module.exports = function(config) {

        /**
         * convert scss to css
         * move converted css into .tmp/styles/index.css
         * '_' prefixed scss files are ignored, must have been imported manually
         */
        gulp.task('styles', function() {

            var scssFiles = gulp.src([
                config.src + '/**/*.scss',
                '!' + config.src + '/**/_*.scss'
            ], {read:false});

            var sassOptions = {
                style: 'expanded'
            };

            var injectOpts = {
                transform: function (filePath) {
                    return '@import \'' + filePath + '\';';
                },
                starttag: '// injector',
                endtag: '// endinjector',
                addRootSlash: false
            };

            // inject scss files into index.scss
            // run sass and autoprefixer on index.scss
            // move index to .tmp
            return gulp.src([
                    config.src + '/**/index.scss'
                ])
                .pipe($.inject(scssFiles, injectOpts))
                .pipe($.sourcemaps.init())
                .pipe($.sass(sassOptions)).on('error', config.errorHandler('Sass'))
                .pipe($.autoprefixer()).on('error', config.errorHandler('Autoprefixer'))
                .pipe($.sourcemaps.write())
                .pipe(gulp.dest(config.tmp))
                .pipe(browserSync.reload({stream:true}));

        });

    };

}());
