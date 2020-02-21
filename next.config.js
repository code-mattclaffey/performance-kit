const docsFolder = './docs/';
const fs = require('fs');

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
        exportPathMap: function() {
            const paths = {
                '/': { page: '/' },
            };

            fs.readdirSync(docsFolder).forEach(file => {
                const filename = file.replace('.md', '');
                paths[`/posts/${filename}`] = { page: `/posts/[id]`, query: { id: filename } };
            });

            return paths;
        },
    };
};

module.exports = withCSS(withConfig());
