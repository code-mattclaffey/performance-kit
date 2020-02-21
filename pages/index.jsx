import React from 'react';
import Link from 'next/link';
import { Heading, Text, Region, RegionInner, List, ListItem } from '@titan-tooling/ui';
import { Header } from '../components/Header';
import '../styles/index.css';

export default function Blog() {
    return (
        <>
            <Header>
                <Heading as="h1" type="h1" additionalClassNames="c-header__heading">
                    <span
                        className="c-header__heading-highlight"
                        style={{
                            '--header-highlight-color': 'var(--secondary)',
                        }}
                    >
                        Performance
                    </span>
                    {` `}
                    <span
                        className="c-header__heading-highlight"
                        style={{
                            '--header-highlight-color': 'var(--secondary-light)',
                        }}
                    >
                        Kit
                    </span>
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
        </>
    );
}
Blog.defaultProps = {
    allData: [],
};
