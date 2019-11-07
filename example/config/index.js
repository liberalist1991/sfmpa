const path = require('path');

module.exports = {
    rem: false,

    dev: {
        path: path.join(__dirname, '../dist/assets'),
        publicPath: '/dist/assets/'
    },

    prod: {
        path: path.join(__dirname, '../dist/assets'),
        publicPath: '/',
        devtool: '#source-map'
    }
}
