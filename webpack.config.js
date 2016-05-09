const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const env = process.env.NODE_ENV;
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    test: path.join(__dirname, 'tests')
};

var common = {
    module: {
        loaders: [{
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]
}

if(TARGET === 'build') {
    module.exports = merge(common, {
        output: {
            library: 'kennyloggins',
            libraryTarget: 'umd'
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin()
        ]
    })
}

if(TARGET === 'test' || TARGET === 'tdd') {
    module.exports = merge(common, {
        devtool: 'inline-source-map',
        resolve: {
            alias: {
                'app': PATHS.app
            }
        },
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    loaders: ['babel?cacheDirectory'],
                    include: PATHS.test
                }
            ]
        }
    });
}