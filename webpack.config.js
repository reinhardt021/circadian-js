const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
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
                    // 'vue-style-loader', // #todo figure this out
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
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
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