"use strict";

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ["./js/main.js"],
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'main.js'
    },
    devtool: "sourcemap",
    externals: {
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ]
    }
}