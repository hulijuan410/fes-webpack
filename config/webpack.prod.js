const merge = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const path = require('path');
const glob = require('glob');

const PATHS = {
    src: path.join(__dirname, '../src')
};

const smp = new SpeedMeasureWebpackPlugin();

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
        new BundleAnalyzerPlugin(),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
        }),
    ],
};

module.exports = smp.wrap(merge(baseConfig, prodConfig));
