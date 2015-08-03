;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');

    module.exports = function(config) {

        gulp.task('templateCache', function() {

            return gulp.src([
                    config.src + '/**/*.tpl.html'
                ])
                .pipe($.minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true
                }))
                .pipe($.angularTemplatecache('templateCacheHtml.js', {
                    module: 'templateCache'
                }))
                .pipe(gulp.dest(config.tmp + '/partials/'))
                .pipe(browserSync.reload({stream: true}));

        });

    }

}());
