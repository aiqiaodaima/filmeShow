var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const url = require('url');
const publicPath = '/mvc/';
const CompressionPlugin = require('compression-webpack-plugin'); //开户gzip压缩
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); //静态文件压缩，替换uglify
const HappyPack = require('happypack'); //提升构建速度
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    //   entry: './src/main.js',
    entry: {
        app: ["babel-polyfill", "./src/main.js"]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: publicPath,
        filename: 'build.[hash].js',
        
    },
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        axios: 'axios',
        vuex: 'Vuex'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.sass$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
                        sass: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            }
        ],
        loaders: [{
                test: /\.vue$/,
                loaders: ['strip-loader?strip[]=console.log,strip[]=console.warn', 'vue']
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loaders: ['strip-loader?strip[]=console.log,strip[]=console.warn', 'babel']
            // },
            {
                test: /\.js$/,
                // exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            src: path.resolve('src'),
            assets: path.resolve('src/assets'),
            components: path.resolve('src/components'),
            views: path.resolve('src/views'),
            store: path.resolve('src/vuex'),
            util: path.resolve('src/util'),
            'jquery': path.resolve('node_modules/jquery/src/jquery')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),
        host: '127.0.0.1',
        port: 8020,
        proxy: {
            '/api/': {
                target: 'http://localhost:9006/',
                changeOrigin: true,
                pathRewrite: {
                    // '^/lottery': ''
                }
            }
        }
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //   names: ['vendor', 'manifest']
        // }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: 'static'
        }]),
        new CleanWebpackPlugin(['dist'])
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';

    module.exports.module.rules = module.exports.module.rules.concat([{
        test: /\.js$/,
        // loader: 'babel-loader',
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happy-babel-js',
        include: [path.resolve('src'), path.resolve('test')]
    }]);

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new ParallelUglifyPlugin({
        //     cacheDir: '.cache/',
        //     uglifyJS: {
        //         output: {
        //             comments: false
        //         },
        //         compress: {
        //             warnings: false
        //         }
        //     }
        // }),
        new CompressionPlugin({
            asset: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            algorithm: 'gzip', //算法
            test: new RegExp(
                '\\.(js|css)$' //压缩 js 与 css
            ),
            threshold: 1024 * 5, //只处理比这个值大的资源。按字节计算
            minRatio: 0.3 //只有压缩率比这个值小的资源才会被处理
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new ExtractTextPlugin('styles.css'),
        new HappyPack({
            id: 'happy-babel-js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        })
    ]);
} else {
    module.exports.module.rules = module.exports.module.rules.concat([{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [path.resolve('src'), path.resolve('test')]
    }]);
}