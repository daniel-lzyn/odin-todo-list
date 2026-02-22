import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";

export default {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: 'Production',
        }),
    ],
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(import.meta.dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            { test: /\.css/i, use: ["style-loader", "css-loader"]},
        ],
    },
};