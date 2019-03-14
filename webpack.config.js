const path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin=require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');//拆分css插件
let CleanWebpackPlugin = require('clean-webpack-plugin');

let styleCss=new ExtractTextWebpackPlugin('css/style.css');
let styleLess=new ExtractTextWebpackPlugin('css/style.less');

module.exports={
    entry:{
        index:'./src/index.js',
        login:'./src/login.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve('dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:styleCss.extract({
                    fallback: "style-loader",
                    use: ['css-loader','postcss-loader']
                })
            },
            {
                test: /\.less$/,     // 解析less
                use: styleLess.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader','less-loader'] // 从右向左解析
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'//img 引入的图片
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,//字体文件，svg
                use: 'file-loader'
            },
            {
                test:/\.js$/,
                use: 'babel-loader',
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/,  // 排除掉node_modules，优化打包速度
            }
        ]
    },
    resolve: {
        // 别名
        alias: {
          pages:path.join(__dirname,'src/pages'),
          component:path.join(__dirname,'src/component'),
          actions:path.join(__dirname,'src/redux/actions'),
          reducers:path.join(__dirname,'src/redux/reducers'),
        },
        // 省略后缀
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html',
            chunks:['index'],
            hash:true
        }),
        new HtmlWebpackPlugin({
            template:'./login.html',
            filename:'login.html',
            chunks:['login'],
            hash:true
        }),
        styleLess,
        styleCss,
        new CleanWebpackPlugin(), // 打包前先清空
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        historyApiFallback: true
    },
    mode:'development'
}