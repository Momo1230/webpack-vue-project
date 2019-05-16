const path = require('path');
const webpack = require('webpack');
const htmlwebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry:'./src/main.js',
    output: {
        filename: "bundle.js",
        path:path.resolve(__dirname,'dist')
    },
    devServer: {
        open:true,
        port:3000,
        hot:true,
        contentBase:'src'
    },
    //为了解析mui中的样式，需要加上这一段代码
    plugins: {
        'autoprefixer': {browsers: 'last 5 version'}
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlwebpackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            filename: "index.html"
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test:/\.less$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"}
                ]
            },{
                test:/\.css$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit:1000,
                    ///static/img/s4.jpg
                    name:path.posix.join('static','img/[name].[ext]?v=[hash:20]')
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['url-loader'],
            },
            {
                //babel-core babel-loader babel-plugin-transform-runtime
                //babel-preset-env babel-present-stage-0
                test:/\.js$/,
                loader: "babel-loader",
                include: path.resolve(__dirname,"src")
            },
            {
                test:/\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    resolve: {
        alias: {
            "vue$":"vue/dist/vue.js"
        }
    }
};