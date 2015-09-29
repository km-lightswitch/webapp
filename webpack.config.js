var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
    entry: "./public/main.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    devtool: "#inline-source-map",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|lib)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }

        ],
    },

    plugins: [
        new ExtractTextPlugin("./public/bundle.css", {
            allChunks: true
        }),
         new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        })
    ]
};