const fs = require('fs');
const path = require('path');

const buildJsFile = data => {
    return `
        export const blogPages = ${JSON.stringify(data)};
    `;
};

module.exports = () => {
    const paths = {
        '/': { page: '/' },
    };

    const jsPaths = [];

    const blogMdFiles = fs.readdirSync(path.resolve(__dirname, '..', 'docs'));

    blogMdFiles.forEach((file, index) => {
        const filename = file.replace('.md', '');
        const blogUrl = `/posts/${filename}`;

        paths[blogUrl] = { page: `/posts/[id]`, query: { id: filename } };

        jsPaths.push({
            url: blogUrl,
            name: `Chapter ${index + 1} - ${filename.replace(/-/g, ' ')}`,
        });
    });

    fs.writeFile(path.resolve(__dirname, '..', 'config', 'blog-pages.js'), buildJsFile(jsPaths), err => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    return paths;
};
