const path = require('path')
const extend = require('./build/extend')
const config = require(path.resolve(process.cwd(), 'config/index'));
const serverCfg = require(path.resolve(process.cwd(), 'config/server'));
const resolve = dir => path.resolve(process.cwd(), dir);
const getIp = require('./build/localIP');

global.config = extend({
    rem: false,

    dev: {
        path: resolve('dist/assets'),
        publicPath: '/dist/assets/',
        filename: '[name]/[name].js', // 入口js命名
        chunkFilename: '[name].js',
        devtool: '#cheap-module-eval-source-map'
    },

    prod: {
        path: resolve('dist/assets'),
        publicPath: '/dist/assets/',
        filename: '[name]/[name].[chunkhash].js', // 入口js命名
        chunkFilename: '[name].[chunkhash].js',
        extractCssName: '[name]/[name].[contenthash].css',
        devtool: '#source-map'
    },

    server: extend({
        url: getIp(),
        port: '8080'
    }, serverCfg)
}, config)

module.exports = global.config
