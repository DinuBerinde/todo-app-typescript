var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./app/src/App.ts",
    output: {
        filename: "./js/bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './app/index.html'
        })
    ],
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    module: {
        rules: [
            { test: /\.ts?$/, use: ["ts-loader"], exclude: /node_modules/ },
        ],
    },
    devServer: {
        watchContentBase: true,
        contentBase: path.join(__dirname, 'dist'),
        port: 8000,
    }
};