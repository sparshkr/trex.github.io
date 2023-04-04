const path = require('path')

module.exports = {
  entry: {
    signup: './src/index.js',
    login: './src/index1.js',
    game: './src/index2.js'

  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'eval-source-map',
  watch: true,
}
