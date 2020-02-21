import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

import { Header } from '../../components/Header';
import { Heading, Text, RegionInner, Region } from '@titan-tooling/ui';

const BlogPage = ({ content, metaData }) => {
    const headerTitle = metaData.title.split(' - ');
    return (
        <div>
            <Head>
                <title>{metaData.title}</title>
                <meta name="description" value={metaData.description} />
            </Head>
            <Header>
                <Heading>
                    <span
                        className="c-header__heading-highlight"
                        style={{
                            '--header-highlight-color': 'var(--secondary)',
                        }}
                    >
                        {headerTitle[1]}
                    </span>
                    <br />
                    <span
                        className="c-heading__heading-sub-heading c-header__heading-highlight"
                        style={{
                            '--header-highlight-color': 'var(--secondary-light)',
                        }}
                    >
                        {headerTitle[2]}
                    </span>
                </Heading>
                <Text additionalClassNames="u-text--short u-text--larger@md">{metaData.description}</Text>
            </Header>
            <Region>
                <RegionInner>
                    <ReactMarkdown source={content.default} />
                </RegionInner>
            </Region>
        </div>
    );
};

BlogPage.getInitialProps = async ({ query }) => {
    const content = await require(`../../docs/${query.id}.md`);
    const metaData = await require(`../../meta/${query.id}.js`);

    return { content, metaData };
};

export default BlogPage;
