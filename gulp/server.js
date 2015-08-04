;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var browserSyncSpa = require('browser-sync-spa');

    module.exports = function(config) {
        
        /**
         * Starts a browserSync server
         */
        gulp.task('server', function() {
            startBrowserSync([config.tmp, config.src]);
        });

        gulp.task('server:dist', function() {
            startBrowserSync([config.dist]);
        });

        function startBrowserSync(staticDirs) {

            var baseDir = staticDirs;

            browserSync.init({
                server: {
                    baseDir: baseDir,
                    routes: {
                        '/bower_components': 'bower_components'
                    }
                }
            });

        }

    }

}());
