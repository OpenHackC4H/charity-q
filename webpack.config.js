module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: './static'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', 
        query: {
          presets: ['latest', 'react']
        }
      }
    ]
  }
}
