var path = require('path');
var webpack = require('webpack');

module.exports = {
    //devtool: 'source-map',
    //devtool: 'cheap-module-eval-source-map',

    //可以配置多个入口模块
    entry: {
        index: [
            './src/app/index'
        ]
    },

    //输入目标
    output: {
        path: path.join(__dirname, 'client/app'),
        filename: '[name].js', //Template based on keys in entry above
        publicPath: '/client/app/'
        //    D:/work_home/nc65gold0331/hotwebs/portal/sync/sscportal/app/
    },

    //common.js 是公共模块
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // // Transfer Files
        // new TransferWebpackPlugin([
        //     {from: 'www'},
        // ], path.resolve(__dirname, 'src')),
        // new ManifestPlugin({
        //     fileName:  'manifest.json'
        // })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                },
                include: __dirname
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|bmp)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};
