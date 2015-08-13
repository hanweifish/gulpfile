;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var browserSyncSpa = require('browser-sync-spa');

    module.exports = function(config) {

        /**
         * Starts a browserSync server serving .tmp and src/
         */
        gulp.task('server', function() {
            startBrowserSync([config.tmp, config.src]);
        });

        /**
         * Starts a browserSync server serving dist/
         */
        gulp.task('server:dist', function() {
            startBrowserSync([config.dist]);
        });

        /**
         * Starts a browserSync server serving static directories
         *
         * @param {String[]} staticDirs - Array of directory names to serve
         */
        function startBrowserSync(staticDirs) {

            var baseDir = staticDirs;

            browserSync.init({
                server: {
                    baseDir: baseDir,
                    // also serve bower_components
                    routes: {
                        '/bower_components': 'bower_components'
                    }
                }
            });

        }

    }

}());
