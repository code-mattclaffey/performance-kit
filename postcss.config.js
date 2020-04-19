const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssImport = require('postcss-import');
const customMedia = require('postcss-custom-media');
const stylelint = require('stylelint');
const mqpacker = require('mqpacker');
const pxtorem = require('postcss-pxtorem');

module.exports = () => {
  return {
    plugins: [
      postcssImport({
        plugins: [stylelint()],
      }),
      postcssCustomProperties(),
      autoprefixer({
        flexbox: 'no-2009',
      }),
      cssnano(),
      customMedia(),
      mqpacker({
        sort: true,
      }),
      pxtorem(),
    ],
  };
};
