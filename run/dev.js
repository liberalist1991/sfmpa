
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseWebpack = require('./build/dev-server');
const mutilPage = require('./build/hide/mutil-page')
const setup = require('./build/hide/setup')
const serverCfg = require('./config').server;

//启动服务
new WebpackDevServer(webpack(baseWebpack), {
    publicPath: baseWebpack.output.publicPath,
    hot: true,
    disableHostCheck: true,
    headers: {
        'Set-Cookie': []
    },
    historyApiFallback: {
        index: './dist/list.html',
        rewrites: [...mutilPage.pageUrlRules]
    },
    setup: function (app) {
        console.log(`open http://${serverCfg.url}:${serverCfg.port}`)
        setup(app)
    },
    proxy: require('./build/hide/proxy'),
}).listen(serverCfg.port);
