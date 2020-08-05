const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    image_picker: './attachments/components/image_picker.js',
    multiple_image: './attachments/components/multiple_image.js',
  },
  output: {
    path: path.resolve('./attachments/static/attachments/'),
    filename: '[name].js'
  },
  plugins: [
    //new CleanWebpackPlugin(['./static/dashboards/'])
  ],
  module: {
    rules: [
      {test:/\.js$/, exclude:/node_modules/, use:{
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {'targets':{'node':10}}], '@babel/preset-react']
        }
      }}
    ]
  },
}
