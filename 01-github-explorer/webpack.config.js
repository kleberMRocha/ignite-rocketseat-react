const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fastRefreshReactPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
mode: isDevelopment ? 'development' : 'production',
devtool:isDevelopment ? 'eval-source-map' : 'source-map',
entry: path.resolve(__dirname, 'src','index.tsx'),
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
},
resolve:{
    extensions: [".ts", ".tsx", ".js", ".jsx","ts","tsx"]
},
devServer:{
    contentBase: path.resolve(__dirname,'public'),
    hot:true,
},
plugins:[ 
    isDevelopment && new fastRefreshReactPlugin(),
    ,new HtmlWebpackPlugin({
    template: path.resolve(__dirname,'public','index.html')
})].filter(Boolean),
module:{
    rules:[{
        test: /\.(j|t)sx$/,
        exclude: /node_modules\/(?!(my_main_package\/what_i_need_to_include)\/).*/,
        use:{
            loader:'babel-loader',
            options: {
                plugins:[
                    isDevelopment && require.resolve('react-refresh/babel')
                ].filter(Boolean)
            }

        },
        
    },
    {
        test: /\.scss$/,
        exclude: /node_modules\/(?!(my_main_package\/what_i_need_to_include)\/).*/,
        use:['style-loader','css-loader','sass-loader'],
    },
    {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
],
}
};