'use strict'

const path = require("path");
const webpack = require('webpack');

const {
    CheckerPlugin
} = require('awesome-typescript-loader');

module.exports = {
    bail: true,
    entry: [require.resolve('./polyfills'), './src/Background.ts'],
    output: {
        path: path.join(__dirname, '../build'),
        publicPath: '/',
        filename: 'Background.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
    },
    module: {
        strictExportPresence: true,
        rules: [
            // First, run the linter.
            // It's important to do this before Typescript runs.
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('tslint-loader'),
                enforce: 'pre',
                include: path.join(__dirname, '../src'),
                options: {
                    typeCheck: true,
                }
            },
            {
                test: /\.js$/,
                loader: require.resolve('source-map-loader'),
                enforce: 'pre',
                include: path.join(__dirname, '../src'),
            },
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('awesome-typescript-loader'),
                include: path.join(__dirname, '../src'),
            }
        ]
    },
    plugins: [
        // Minify the code.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                // This feature has been reported as buggy a few times, such as:
                // https://github.com/mishoo/UglifyJS2/issues/1964
                // We'll wait with enabling it by default until it is more solid.
                reduce_vars: false,
            },
            output: {
                comments: false,
            },
            sourceMap: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CheckerPlugin()
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
};