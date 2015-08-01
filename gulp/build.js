;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');

    module.exports = function(config) {
        
        /**
         * Build .tmp to dist
         */
        gulp.task('build', function() {

            var assets;
            var cssFilter = $.filter('**/*.css');
            var jsFilter = $.filter('**/*.js');
            var htmlFilter = $.filter('*.html');

            return gulp.src(config.tmp + '/*.html')
                // all assets in index.html
                .pipe(assets = $.useref.assets())
                .pipe($.rev())
                //js
                .pipe(jsFilter)
                .pipe($.uglify({ preserveComments: 'some'})).on('error', config.errorHandler('Uglify'))
                .pipe(jsFilter.restore())
                // css
                .pipe(cssFilter)
                .pipe($.csso())
                .pipe(cssFilter.restore())
                // all
                .pipe(assets.restore())
                .pipe($.useref())
                .pipe($.revReplace())
                // html
                .pipe(htmlFilter)
                .pipe($.minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true,
                    conditionals: true
                }))
                .pipe(htmlFilter.restore())
                .pipe(gulp.dest(config.dist + '/'));

        });

    }

}());
