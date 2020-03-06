const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const path = require('path');

const devConfig = {
    mode: 'development',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].[hash].js',
        publicPath:'/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: '../src/*/index.html',
        watchContentBase: true,
    },
    devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
