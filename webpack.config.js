const path = require('path');

const nodeConfig = {
  entry: './src/index.js',
  mode: 'production',
  // target: 'node',
  output: {
    filename: 'lib.node.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: '',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
  },
};

module.exports = [nodeConfig];
