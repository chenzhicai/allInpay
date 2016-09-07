var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var htmlPluginObject = new HtmlwebpackPlugin({
    title: 'Hello World app'
});
module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        installmentPayment: "./js/controllers/installmentPayment.js",
    },
    //入口文件输出配置
    output: {
        path: './dist/js',
        filename: '[name].min.js'
    },
    module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            /*        {
                        test: /\.scss$/,
                        loaders: ['style', 'css', 'sass'],
                    },*/
            //.js 文件使用 jsx-loader 来编译处理
            {
                test: /\.js$/,
                loader: 'jsx-loader?harmony'
            },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap'
            },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        //查找module的话从这里开始查找
        root: 'F:/caiWork/mobileWeb/instalmentPayment', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            //            iscrollAssist : path.join('js/iscrollAssist.js'),//后续直接 require('iscrollAssist') 即可
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
}