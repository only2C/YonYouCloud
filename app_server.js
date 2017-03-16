var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
const iwebapMiddleware = require('./routes/iwebap');

var express = require('express');
var app = express();
var port = 8888;
var ip = '0.0.0.0';

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}));
//app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath, lazy: false, watchOptions: {aggregateTimeout: 300,poll: true}}))
app.use(webpackHotMiddleware(compiler));
app.use('/', express.static(__dirname + '/client'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use(iwebapMiddleware(config));

app.listen(port, ip, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==>    Listening on port %s. Open up http://%s:%s/ in your browser.", port, ip, port)
    }
});
