;(function() {
'use strict';

    // Deps
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var browserSync = require('browser-sync');
    var webpack = require('webpack');
    var webpackDevServer = require('webpack-dev-server');
    var webpackConfigs = require('../webpack.config.js');

    module.exports = function(config) {
        
        /**
         * Webpack
         */
        gulp.task('webpack', function(done) {

            webpack(webpackConfigs, function(err, stats) {
                if (err) throw new $.util.PluginError('webpack', err);
                $.util.log('[webpack]', stats.toString());
                done();
            });

        });

    }

}());

