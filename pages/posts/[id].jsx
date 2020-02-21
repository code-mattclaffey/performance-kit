import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Link from 'next/link';
import '../../components/Prism';

import { Header, HeadingHighlight } from '../../components/Header';
import { Heading, Text, RegionInner, Region } from '@titan-tooling/ui';
import { BACK_TO_HOME_LINK_TEXT } from '../../constants';
import { Footer } from '../../components/Footer';

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
                    <HeadingHighlight highlightColor="var(--secondary)">{headerTitle[1]}</HeadingHighlight>
                    <br />
                    <HeadingHighlight highlightColor="var(--secondary-light)" additionalClassNames="c-heading__heading-sub-heading">
                        {headerTitle[2]}
                    </HeadingHighlight>
                </Heading>
                <Text additionalClassNames="u-text--short u-text--larger@md">{metaData.description}</Text>
            </Header>
            <Region as="main">
                <RegionInner as="article">
                    <ReactMarkdown source={content.default} />
                    <Link href="/">
                        <a className="c-button c-button--primary">{BACK_TO_HOME_LINK_TEXT}</a>
                    </Link>
                </RegionInner>
            </Region>
            <Footer />
        </div>
    );
};

BlogPage.getInitialProps = async ({ query }) => {
    const content = await require(`../../docs/${query.id}.md`);
    const metaData = await require(`../../meta/${query.id}.js`);

    return { content, metaData };
};

export default BlogPage;
