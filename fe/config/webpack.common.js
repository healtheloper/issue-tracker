/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const webpack = require('webpack');

dotenv.config();

const getPublicUrl = () => {
  const envPublicUrl = process.env.PUBLIC_URL;
  if (envPublicUrl) {
    return envPublicUrl.endsWith('/') ? envPublicUrl : `${envPublicUrl}/`;
  }
  const { homepage } = require('../package.json');
  if (homepage) {
    return homepage.endsWith('/') ? homepage : `${homepage}/`;
  }
  return '/';
};

process.env = { ...process.env, PUBLIC_URL: getPublicUrl() };

module.exports = {
  entry: {
    app: path.join(__dirname, '..', 'src', 'index.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, '..', 'src/components'),
      '@constants': path.resolve(__dirname, '..', 'src/constants'),
      '@style': path.resolve(__dirname, '..', 'src/style'),
      '@pages': path.resolve(__dirname, '..', 'src/pages'),
      '@contexts': path.resolve(__dirname, '..', 'src/contexts'),
      '@server': path.resolve(__dirname, '..', 'src/server'),
      '@hooks': path.resolve(__dirname, '..', 'src/hooks'),
      '@type': path.resolve(__dirname, '..', 'src/type'),
      '@util': path.resolve(__dirname, '..', 'src/util'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
      base: '/',
    }),
    new InterpolateHtmlPlugin(process.env),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
  },
};
