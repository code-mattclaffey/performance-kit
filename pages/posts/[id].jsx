import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Link from 'next/link';
import '../../styles/index.css';

import { Header, HeadingHighlight } from '../../components/Header';
import { Heading, Text, RegionInner, Region } from '@titan-tooling/ui';
import { BACK_TO_HOME_LINK_TEXT } from '../../constants';
import { Footer } from '../../components/Footer';

const BlogPage = ({ content, metaData }) => {
    useEffect(() => {
        window.addEventListener('load', () => {
            Prism.highlightAll();
        });
    }, []);

    const headerTitle = metaData.title.split(' - ');
    return (
        <div>
            <Head>
                <title>{metaData.title}</title>
                <meta name="description" content={metaData.description} />
                <script type="text/javascript" src="/scripts/prism.js" defer />
            </Head>
            <Header>
                <Heading>
                    <HeadingHighlight highlightColor="var(--secondary)">{headerTitle[0]}</HeadingHighlight>
                    <br />
                    <HeadingHighlight highlightColor="var(--secondary-light)" additionalClassNames="c-heading__heading-sub-heading">
                        {headerTitle[1]}
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
