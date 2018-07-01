var webpack = require('webpack');
var path = require('path');

module.exports =  {
    entry: {
        'button-load': ['./src/button-load.module.js']
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/',
        // publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader'
            }
        ]
    }
};
