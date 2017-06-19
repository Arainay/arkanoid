module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /dist/],
                loader: 'babel-loader',
                options: { presets: ['env'] }
            }
        ]
    }
};