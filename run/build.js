const webpack = require('webpack');
const prodConf = require('./build/prod-build');

webpack(prodConf, (err, stats) => {
    console.log(err || stats.toString({
        chunks: false,
        colors: true
    }));
});
