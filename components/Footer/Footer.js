import React from 'react';
import { Region, RegionInner, Heading, Text, Anchor } from '@titan-tooling/ui';
import { MADE_WITH, AUTHOR } from '../../constants';

export const Footer = () => (
    <Region as="footer">
        <RegionInner additionalClassNames="c-footer__container u-text--center">
            <Heading type="h5">
                {MADE_WITH}{' '}
                <Anchor target="_blank" href="https://twitter.com/mattclaffey1">
                    {AUTHOR}
                </Anchor>{' '}
                🚀
            </Heading>
        </RegionInner>
    </Region>
);
