import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import '../components/Prism';

import { blogPages } from '../config/blog-pages';

import { Heading, Text, Region, RegionInner, List, ListItem } from '@titan-tooling/ui';
import { Header, HeadingHighlight } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/index.css';
import { MAIN_TITLE_NAME, SECOND_TITLE_NAME, INTRO, CHAPTERS_TITLE } from '../constants';

const Homepage = ({ metaData }) => {
    return (
        <>
            <Head>
                <title>{metaData.title}</title>
                <meta name="description" content={metaData.description} />
            </Head>
            <Header>
                <Heading as="h1" type="h1" additionalClassNames="c-header__heading">
                    <HeadingHighlight highlightColor="var(--secondary)">{MAIN_TITLE_NAME}</HeadingHighlight>
                    {` `}
                    <HeadingHighlight highlightColor="var(--secondary-light)">{SECOND_TITLE_NAME}</HeadingHighlight>
                </Heading>
                <Text additionalClassNames="u-text--short u-text--larger@md">{INTRO}</Text>
            </Header>
            <Region as="main">
                <RegionInner>
                    <Heading>{CHAPTERS_TITLE}</Heading>
                    <List>
                        {blogPages.map(blogPage => (
                            <ListItem key={blogPage.url} additionalClassNames="u-text--sentence-case">
                                <Link href="/posts/[id]" as={blogPage.url}>
                                    <a>{blogPage.name}</a>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </RegionInner>
            </Region>
            <Footer />
        </>
    );
};

Homepage.getInitialProps = async () => {
    const metaData = await require(`../meta/index.js`);

    return { metaData };
};

export default Homepage;
