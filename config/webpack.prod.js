const merge = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const path = require('path');

const prodConfig = {
    mode: 'production',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].[chunkhash:8].js',
        // publicPath: 'coupun/'
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
    ],
};

module.exports = merge(baseConfig, prodConfig);
