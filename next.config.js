const buildBlogPages = require('./tasks/build-local-pages');
const withCSS = require('@zeit/next-css');

const withConfig = () => {
    return {
        webpack: config => {
            config.module.rules.push({
                test: /\.md$/,
                use: 'raw-loader',
            });

            return config;
        },
        exportPathMap: buildBlogPages,
    };
};

module.exports = withCSS(withConfig());
