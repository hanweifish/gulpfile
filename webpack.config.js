;(function() {
'use strict';

    // Deps
    var path = require('path');
    var webpack = require('webpack');

    module.exports = {

        cache: true,

        entry: {
            app: [
                'webpack/hot/dev-server',
                path.resolve(__dirname, 'src', 'index.js')
            ]
        },

        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel'
                }
            ]
        },

        output: {
            path: path.join(__dirname, '.tmp'),
            publicPath: '.tmp/',
            filename: '[name].js',
            chunkFilename: '[chunkhash].js'
        }

    };

}());
