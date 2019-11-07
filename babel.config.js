const path = require('path');
function resolve(p) {
    return path.resolve(__dirname, 'node_modules', p)
}
module.exports = {
    'presets': [
        [resolve('@babel/preset-env'), {
            "targets": {
                "browsers": [
                    "last 2 versions",
                    "ie >= 7"
                ]
             },
             "modules": 'commonjs'
        }]
    ],
    'plugins': [
        [resolve('@babel/plugin-transform-runtime'), {
            'absoluteRuntime': resolve('@babel/runtime')
        }]
    ]
};
