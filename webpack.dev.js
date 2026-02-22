import { merge } from "webpack-merge";
import common from './webpack.common.js';

export default merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: './dist',
        watchFiles: {
            paths: ["src/index.html"],
            options: {
                usePolling: false,
            },
        },
    },
});