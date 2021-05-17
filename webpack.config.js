const path = require('path');

module.exports = {

    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '',
        filename: 'bundle.js'
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
    
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }

};