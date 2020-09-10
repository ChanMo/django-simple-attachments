const path = require('path');

module.exports = {
  entry: {
    image_picker: './attachments/components/image_picker.js',
    multiple_image: './attachments/components/multiple_image.js',
  },
  output: {
    path: path.resolve('./attachments/static/attachments/'),
    filename: '[name].js'
  },
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
  // Useful for debugging.
  devtool: 'source-map',
  // By default webpack logs warnings if the bundle is bigger than 200kb.
  performance: { hints: false }
}
