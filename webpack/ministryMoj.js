const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageJson = require.resolve('@ministryofjustice/frontend/package.json');
const root = path.resolve(packageJson, '..', 'moj');
const sass = path.resolve(root, 'all.scss');
const components = path.resolve(root, 'components');
const assets = path.resolve(root, 'assets');
const images = path.resolve(assets, 'images');

const copyMinistryMojTemplateAssets = new CopyWebpackPlugin([
  { from: images, to: 'assets/images' },
]);

module.exports = {
  paths: { template: root, components, sass, assets },
  plugins: [copyMinistryMojTemplateAssets],
};
