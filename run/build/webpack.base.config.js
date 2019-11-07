/**
 * Created by thinkzhan
 */
'use strict';
const path = require('path');
const webpack = require('webpack');

const MutilHtmlWebpackPlugin = require('mutil-html-webpack-plugin');
const HtmlRemoveWhitespacePlugin = require('html-remove-whitespace-plugin');

const jsEntryRules = require('./hide/mutil-page').jsEntryRules;
const styleGen = require('./hide/style');

function resolve(dir) {
    return path.resolve(process.cwd(), dir)
}

function resolveLib(dir) {
    return path.join(__dirname, './lib', dir)
}

const __ENV__ = (process.env.NODE_ENV === 'prod' || global.NODE_ENV === 'prod') ? 'prod' : 'dev';

const cfgs = require('../config');
const cfg = cfgs[__ENV__];

module.exports = {
    // 入口
    entry: Object.assign({
        'bundle': [
            resolveLib('hack/es5-shim.min.js'),
            resolveLib('hack/es5-sham.min.js'),
            resolveLib('jquery-1.8.3.min.js'),
            resolveLib('underscore-1.8.3.js'),
            resolveLib('velocity.js')
        ]
    }, jsEntryRules),
    // 输出
    output: {
        path: cfg.path,
        publicPath: cfg.publicPath,
        filename: cfg.filename,
        chunkFilename: cfg.chunkFilename
    },
    devtool: cfg.devtool,
    // 加载器
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('node_modules/sfax/')
                ],
                query: require('../../babel.config')
            }, {
                test: /index\.js$/,
                loader: 'vm-index-loader',
                include: [
                    resolve('src')
                ]
            },
            {
                test: /\.css$/,
                loader: styleGen.geneCssLoader(cfgs.rem)
            }, {
                test: /\.scss$/,
                loader: styleGen.geneSassLoader(cfgs.rem)
            }, {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(html)$/,
                loader: 'vtl-loader',
                query: {
                    include: [
                        resolve('src')
                    ]
                }
            }, {
                test: /\.(html)$/,
                loader: 'vm-build-loader',
                query: {
                    env: __ENV__,
                    upgrade: true,
                    directives: ['module', 'fragment', 'node_modules', 'component', 'vm', 'page']
                },
                include: [resolve('src/page')]
            }]
    },
    resolveLoader: {
        root: [
            resolve('node_modules'),
            path.resolve(__dirname, '../../node_modules')
        ]
    },

    resolve: {
        extensions: ['', '.js'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            '@': resolve('src'),
            module: resolve('src/module'),
            page: resolve('src/page')
        },
        root: [
            resolve('node_modules'),
            path.resolve(__dirname, '../../node_modules')
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            __DEV__: __ENV__ === 'dev'
        }),
        new webpack.NoErrorsPlugin(),

        new webpack.ProvidePlugin({
            Event: resolve('src/assets/util/event.js')
            // sfax: resolveLib('sfax.js')
        }),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['manifest'] // 指定公共 bundle 的名字。
        }),

        new MutilHtmlWebpackPlugin({
            page: './src/page', // 输入目录
            toPage: '../vm', // 输出路径，相对于publicPath, 默认publicPath
            name: 'index',
            ext: '.html', // 输入文件后缀,默认.vm
            toExt: __ENV__ === 'prod' ? '.vm' : '.html', // 输出文件后缀,默认.vm
            alwaysWriteToDisk: true,
            outputPagemap: true,
            moreChunks: ['manifest', 'bundle'],
            specialPages: { // 个性化配置， 目前只支持重写moreChunks
            }
        }),
        new HtmlRemoveWhitespacePlugin({
            // include: /city\-index/
        })
    ]
};
