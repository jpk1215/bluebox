import path from 'path';
import webpack from 'webpack';

export default {
	devtool: 'eval-source-map',
  entry: path.join(process.cwd(), 'embeddedApp/index'),
  output: {
    filename: 'bundleEmbedded.js',
    path: path.join(process.cwd(), 'public', 'js'),
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'eslint-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  target: 'web',
};