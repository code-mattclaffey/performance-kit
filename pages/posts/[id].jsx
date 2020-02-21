import ReactMarkdown from 'react-markdown';

const BlogPage = ({ content }) => {
    return (
        <div>
            <ReactMarkdown source={content.default} />
        </div>
    );
};

BlogPage.getInitialProps = async ({ query }) => {
    const content = await require(`../../docs/${query.id}.md`);

    return { content };
};

export default BlogPage;
