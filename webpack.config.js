const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        Clooca: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'diagram-editor.js',
        library: "Clooca",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js[x]?$/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2017']
                }
            },
            {
                loaders: ['style-loader', 'css-loader?modules'],
                test: /\.css$/
            },
            {
                loader: 'svg-url-loader',
                test: /\.svg$/,
                options: {
                    noquotes: false
                }
            }
        ]
    },
    externals: {
        "CloocaDiagramEditor": "CloocaDiagramEditor"
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'Version= ' + require('./package.json').version,
            raw: false, entryOnly: true,
        })
    ]
};
