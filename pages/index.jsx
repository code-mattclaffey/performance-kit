import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { Heading, Text, Region, RegionInner, List, ListItem } from '@titan-tooling/ui';
import { Header, HeadingHighlight } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/index.css';

const Homepage = ({ metaData }) => {
    return (
        <>
            <Head>
                <title>{metaData.title}</title>
                <meta name="description" value={metaData.description} />
            </Head>
            <Header>
                <Heading as="h1" type="h1" additionalClassNames="c-header__heading">
                    <HeadingHighlight highlightColor="var(--secondary)">Performance</HeadingHighlight>
                    {` `}
                    <HeadingHighlight highlightColor="var(--secondary-light)">Kit</HeadingHighlight>
                </Heading>
                <Text additionalClassNames="u-text--short u-text--larger@md">
                    This collection of tutorials are based on my learnings from client projects. For each topic I will show you how to identify,
                    implement and evaluate performance techniques that can improve your site's load time.
                </Text>
            </Header>
            <Region as="main">
                <RegionInner>
                    <Heading>Chapters</Heading>
                    <List>
                        <ListItem>
                            <Link href="/posts/[id]" as="/posts/loading-fonts-the-fout-way">
                                <a>Chapter 1 - Loading fonts the fout way</a>
                            </Link>
                        </ListItem>
                    </List>
                </RegionInner>
            </Region>
            <Footer></Footer>
        </>
    );
};

Homepage.getInitialProps = async () => {
    const metaData = await require(`../meta/index.js`);

    return { metaData };
};

export default Homepage;
