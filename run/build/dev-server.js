/**
 * Created by thinkzhan
 */
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const serverCfg = require('../config').server;
const baseWebpack = require('./webpack.base.config');


for (let i in baseWebpack.entry) {
    baseWebpack.entry[i].unshift(
        'eventsource-polyfill',
        `webpack-dev-server/client?http://${serverCfg.url}:${serverCfg.port}`,
        "webpack/hot/dev-server");
}

baseWebpack.plugins.push(new webpack.HotModuleReplacementPlugin());
baseWebpack.plugins.push(new OpenBrowserPlugin({ url: `http://${serverCfg.url}:${serverCfg.port}` }))
module.exports = baseWebpack
