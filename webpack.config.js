var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/public/src/js/main.js',
    output: {
        path: __dirname + '/public/dist/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /.css$/,
                loader: "style!css"
            },
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.sass$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};