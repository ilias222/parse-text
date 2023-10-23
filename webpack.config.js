const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './dist/webpack.js'),
    },

    mode: "development",

    output: {
        path: path.resolve(__dirname, './'),
        filename: 'App-mini.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './dist/listFAQ.html'), // шаблон
            filename: 'listFAQ.html', // название выходного файла
        }),
        new MiniCssExtractPlugin({
            filename: 'styleWpack.css'
        }),

    ],

    devServer: {
        static: {
          directory: path.join(__dirname, ''),
        },
        compress: true,
        hot: true,
        port: 9000,
      },

    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options:{
                    presets:[ "@babel/preset-react"]
                }
            }

        ],
    },
}