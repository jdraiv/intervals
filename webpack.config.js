const path = require('path');

module.exports = {
    entry: {
        // Dashboard: './static/components/dashboard/Dashboard.jsx',
        Authentication: './static/components/authentication/Authentication.jsx'
    },
    output: {
        path: path.resolve(__dirname, './static/bundles'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test:  /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
}
