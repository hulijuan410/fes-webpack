# 页面布局说明
- 配置文件在config文件夹；
- 入口文件在src文件夹，src目录下的每个文件夹对应一个页面（除了images文件夹以外），html css js都是以index命名；
- 打包输出文件到dist文件夹；

## webpack多配置
- 基础配置：webpack.base.js
- 开发环境：webpack.dev.js
- 生产环境：webpack.prod.js

通过webpack-merge将配置进行组合

## 使用ESLint规范构建脚本
1. 增加webpack配置：使用eslint-loader对所有引入的js文件进行规范检查
    ```
    {
        test:/.js$/,
        use:['babel-loader','eslint-loader']
    }
    ```
2. 安装依赖包：eslint eslint-plugin-import eslint-config-airbnb-base（eslint规范）babel-eslint [详情](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base);
3. 创建eslint配置文件[.eslintrc.js](https://cn.eslint.org/docs/rules/)
    ```js
    module.exports = {
        //parser指定解析器
        "parser": "babel-eslint",
        //使用eslint推荐的规则作为基础配置(如果使用react，则用airbnb),可以在rules中覆盖
        "extends":"airbnb-base",
        "env": {
            "browser": true,
            "node": true
        },
        //配置规则
        "rules":{
            "indent": ["error", 4],
        }
    }
    ```
4. 建立.eslintignore对某些文件忽略检查
    ```
    # Ignore build files except build/index.js
    build/
    !build/index.js
    ```
不管有没有在.eslintignore中进行配置，eslint都会默认忽略掉对/node_modules/** 的检查

## babel配置

配置.babelrc文件:一个plugins对应一个功能，presets是多个plugins功能的集合.
```js
{
    "presets": [
        [
            "@babel/preset-env",//将js目前最新语法转为ES5
            {
                "corejs": "3",
                "useBuiltIns": "usage"
            }
        ]
    ],
    "plugins": []
}
```
安装依赖包@bable/core @babel/preset-env core-js@3，并在webpack配置babel-loader。
说明：@babel/preset-env在默认情况下只编译语法，不会对新方法和新的原生对象进行转译，如 Array.includes，Map，Set 等，这些需要通过 Polyfill 来解决，需要安装@babel/polyfill，通过import '@babel/polyfill';在js中直接引入，通过这种方式引入，会将整个@babel/polyfill引入导致包体积变大。
优化方案：@babel/preset-env的配置项中提供了useBuiltIns参数，在配置@babel/preset-env时配置useBuiltIns，Babel在编译的时候就会自动进行 Polyfill。
useBuiltIns参数：
- false：不对Polyfill做操作
- usage: 根据配置的浏览器兼容性，以及你代码中使用到的 API 来进行 Polyfill ，实现按需加载
- entry: 功能和usage一样，不过需要在文件入口import'@babel/polyfill'
[复用辅助函数优化](https://juejin.im/post/5e5b488af265da574112089f#heading-11)

## 遇到的问题
1. 使用webpack-dev-server每次修改文件之后浏览器不自动刷新
    解决方法：修改devServer配置
    ```js
    devServer: {
        //contentBase: './dist',
        //hot:true
        contentBase: '../src/*/index.html',//将dist目录改为html目录
        watchContentBase: true,
    },
    ```
2. webpack处理html中的图片问题
    配置html-loader和url-loader
    ```js
    {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [{
            loader: 'url-loader',
            options: {
                name: '[name].[hash:8].[ext]',
                limit: 10240, // 10kb，如果引入图片小于10kb自动转换成base64
                publicPath: "images/",//用于拼接html中img标签的src，生产环境可以根据后端路径改publicPath
                outputPath: "images/",//输出图片放置的位置(决定图片生成的位置——在dist下的images文件夹)
                esModule:false//不设置此属性，html中图片src为object（<img src="[object Module]" alt="">）
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
    ```
## 构建速度和体积优化策略
### 速度分析
使用speed-measure-webpack-plugin
### 体积分析
使用webpack-bundle-analyzer
### 优化体积
treeShaking去除无用的js和css
- mode设置为production可以自动去除无用js
- [purgecss-webpack-plugin](https://github.com/FullHuman/purgecss/tree/master/packages/purgecss-webpack-plugin)可以去除无用的css，该插件要与mini-css-extract-plugin配合使用




