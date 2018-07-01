var webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports =  {
    entry: {
        'button-load': ['./src/button-load.module.js'],
        'button-load.min': ['./src/button-load.module.js']
    },
    devtool: "source-map",
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
    },
    plugins: [
        new UglifyJsPlugin({
            include: /\.min\.js$/,
            // minimize: true
        })
    ]
};
