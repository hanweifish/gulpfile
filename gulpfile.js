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

        gulp.start('server');

        runSequence(
            'clean', 
            'inject:moveindex', 
            ['styles', 'javascript', 'templateCache'], 
            'inject', 
            'watch'
        );

    });

    /**
     * gulp serve:dist
     */
    gulp.task('serve:dist', function() {

        runSequence(
            'clean', 
            'inject:moveindex', 
            ['styles', 'javascript', 'others', 'templateCache'], 
            'inject', 
            'build', 
            'server:dist'
        );

    });

}());
