const webpack = require('webpack');
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cfgs = require('../config');
const cfg = cfgs['prod'];

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new ExtractTextPlugin(cfg.extractCssName),
        new webpack.optimize.UglifyJsPlugin({ // 压缩文件
            compress: {
                warnings: false,
                screw_ie8: false,
                drop_debugger: true,
                drop_console: true
            },

            mangle: {
                screw_ie8: false
            },

            output: {
                screw_ie8: false
            }
        }),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\..*\.css$/,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                autoprefixer: { remove: false },
                safe: true
            }
        })
    ]

})
