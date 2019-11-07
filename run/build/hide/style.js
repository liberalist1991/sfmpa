const ExtractTextPlugin = require('extract-text-webpack-plugin');
const needExtract = process.env.NODE_ENV === 'prod' || global.NODE_ENV === 'prod';

module.exports = {

    geneCssLoader() {
            return needExtract ? ExtractTextPlugin.extract('style',
                    `css-loader!autoprefixer-loader`) :
                `style-loader!css-loader!autoprefixer-loader`
        },

        geneSassLoader() {
            return needExtract ? ExtractTextPlugin.extract('style',
                    `css-loader!autoprefixer-loader!sass-loader?sourceMap`
                ) :
                `style-loader!css-loader!autoprefixer-loader!sass-loader?sourceMap`

        }
}
