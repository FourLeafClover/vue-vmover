const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: ['vue', 'axios', 'vue-router', 'better-scroll']
    },
    plugins: [
        new CleanWebpackPlugin(
            ['*'], {
                root: resolve("dist"),
                verbose: true,
                dry: false
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new HtmlWebpackPlugin({
            title: 'V电影',
            template: resolve("src/index.html"),
            inject: true,
            //favicon: resolve("src/favicon.ico") 因为目前我没有ico图片,所以不设置
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: resolve('dist'),
        chunkFilename: "[id].[chunkHash:8].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', ".css", "png", "jpg", "gif"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
        symlinks: false
    },
    module: {
        rules: [{
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                include: [resolve("src")],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',
                    options: {
                        name: 'assets/css/[name].[chunkHash:8].css'
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(vue)$/,
                use: [{
                    loader: 'vue-loader',
                    options: {

                    }
                }]
            }
        ]
    }
};