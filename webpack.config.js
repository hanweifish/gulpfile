;(function() {
'use strict';

    // Deps
    var path = require('path');
    var webpack = require('webpack');

    module.exports = {
        cache: true,
        entry: {
            app: path.resolve(__dirname, 'src', 'app.js')
        },
        output: {
            path: path.join(__dirname, '.tmp'),
            publicPath: '.tmp/',
            filename: '[name].js',
            chunkFilename: '[chunkhash].js'
        }
    };

}());
