const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './',
        compress: true,
        port: 3000,
        progress: true,
        allowedHosts: [
            'localhost:8080'
        ]
    },
})
