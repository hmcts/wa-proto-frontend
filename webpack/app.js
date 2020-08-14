const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const assets = path.resolve(__dirname, '../src/main/assets');
const images = path.resolve(assets, 'images');

const copyLookAndFeelAssets = new CopyWebpackPlugin(
  [{ from: images, to: 'assets/images' }],
);

module.exports = {
  paths: { template: assets },
  plugins: [ copyLookAndFeelAssets ],
};
