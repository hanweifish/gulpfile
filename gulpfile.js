;(function() {
    'use strict';

    // Deps
    var fs = require('fs');
    var path = require('path');
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var del = require('del');
    var runSequence = require('run-sequence');
    // specify a different source folder to build
    var gulpSrc = process.env.GULP_SRC || 'src';

    // Configs
    var config = {

        src: gulpSrc,

        dist: 'dist',

        tmp: '.tmp',

        configJson: './config.json',

        errorHandler: function(name) {
            return function(e) {
                $.util.log($.util.colors.red(name + e.toString()));
                this.emit('end');
            };
        }

    };

    // Load each gulp task in gulp folder
    fs.readdirSync(path.resolve(__dirname, 'gulp')).forEach(function(file) {
        if (file.charAt(0) === '.') return;
        var requirePath = path.resolve(__dirname, 'gulp', file);
        require(requirePath)(config);
    })

    /**
     * gulp serve
     * starts browserSync and starts watch
     */
    gulp.task('serve', function() {

        runSequence(
            'clean',
            'env',
            'inject:moveindex',
            // compile each respective into .tmp
            ['styles', 'javascript', 'templateCache'],
            // inject each respective into index.html
            'inject',
            'watch',
            'server'
        );

    });

    gulp.task('serve:webpack', function() {

        runSequence(
            'clean',
            'inject:moveindex',
            // compile each respective into .tmp
            ['styles', 'webpack', 'templateCache'],
            // inject each respective into index.html
            'inject',
            'watch:webpack',
            'server'
        );

    });

    /**
     * gulp serve:dist
     */
    gulp.task('serve:dist', function() {

        runSequence(
            'clean',
            'env',
            'inject:moveindex',
            // compile each respective into .tmp
            ['styles', 'javascript', 'templateCache', 'others'],
            // inject each respective into index.html
            'inject',
            // concat using index
            'build',
            'server:dist'
        );

    });

}());
