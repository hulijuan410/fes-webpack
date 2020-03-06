# webpack多配置
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

## 遇到的问题
- 使用webpack-dev-server每次修改文件之后浏览器不自动刷新
    解决方法：修改devServer配置
    ```js
    devServer: {
        //contentBase: './dist',
        //hot:true
        contentBase: '../src/*/index.html',//将dist目录改为html目录
        watchContentBase: true,
    },
    ```
- webpack处理html中的图片问题
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



