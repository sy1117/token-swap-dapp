var webpack = require('webpack');
var path = require('path');
module.exports = {
    resolve: {
        root: path.resolve('./src'),
    },
    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:4000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch'
    ],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "**": "http://localhost:3000"
        },
        stats: {
          // Config for minimal console.log mess.
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        }
    },


    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                // test: /\.js$/,
                // loaders: ['react-hot-loader/webpack', 'babel?' + JSON.stringify({
                //     cacheDirectory: true,
                //     presets: ['es2015', 'react']
                // })],
                // exclude: /node_modules/,
                test: /.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader'
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve("file-loader"),

            },
            {
                test: /\.json$/,
                loader: 'json-loader'
              }
        ]
    }


};
