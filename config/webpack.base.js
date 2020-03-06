const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const glob = require('glob');
const path = require('path');

console.log('---------------',process.env.NODE_ENV);

const setMPA = () => {
    const entry = {};
    const htmlWebpackPLugins = [];
    const entryFiles = glob.sync(path.join(__dirname, '../src/*/index.js'));
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];
        // Users/juanjuan/Documents/myproject/src/index/index.js
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];

        entry[pageName] = entryFile;
        return htmlWebpackPLugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `../src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ['vendor', 'common', pageName],
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false,
                },
            }),
        );
    });

    return {
        entry,
        htmlWebpackPLugins,
    };
};
const { entry, htmlWebpackPLugins } = setMPA();
module.exports = {
    entry,
    module: {
        rules: [
            {
                test: /.js$/,
                use: ['babel-loader'],
            },
            {
                test: /.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer(),
                            ],
                        },
                    },
                ],
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash:8].[ext]',
                        limit: 10240, // 10kb如果引入图片小于10kb自动转换成base64
                        publicPath: "images/",
                        outputPath: "images/",
                        esModule:false
                    },
                }],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
    ].concat(htmlWebpackPLugins),
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 10, // 优先级高的先被分离
                },
                common: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    priority: 5,
                    minSize: 0,
                },
            },
        },
    },
};
