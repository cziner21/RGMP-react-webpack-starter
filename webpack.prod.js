const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const { EnvironmentPlugin } = require('webpack')

const prodConfig = {
    mode: 'production',
    plugins: [
        new EnvironmentPlugin({
            API_ROOT: 'http://localhost:5000',
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig)
