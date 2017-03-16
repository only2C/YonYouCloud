var path = require('path');
var webpack = require('webpack');

module.exports = {
    //devtool: 'source-map',
    devtool: 'cheap-module-eval-source-map',

    //可以配置多个入口模块
    entry: {
        index: [
            'webpack-hot-middleware/client',
            './src/app/index'
        ]
    },

    //输入目标（将打包文件放入网报路径时使用，path.join中的两个参数分别修改为当前实际路径，执行命令：webpack --config webpack.product.config.js）
    output: {
        path: path.join('D:/home/nc65gold0331/hotwebs/portal/sync/', 'sscportal/app'),
        filename: '[name].js', //Template based on keys in entry above
        publicPath: '/sscportal/app'
    },

    //common.js 是公共模块
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
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