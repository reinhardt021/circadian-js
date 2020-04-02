const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif|mp4)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
    },
};