const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    compress: false,
    // useLocalIp: true,
    // allowedHosts:[
    //   '.ec2-3-16-158-49.us-east-2.compute.amazonaws.com',
    //   'ec2-3-16-158-49.us-east-2.compute.amazonaws.com'
    // ],
    // public: 'ec2-3-16-158-49.us-east-2.compute.amazonaws.com:8080',
    // host: '3.16.158.49',
    // port: 8080,
    // contentBase: path.resolve(__dirname, './src'), 
    disableHostCheck: false, 
    host: "0.0.0.0" // default : 127.0.0.1
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};