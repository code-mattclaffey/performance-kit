import React from 'react';
import { Region, RegionInner, Heading, Text, Anchor } from '@titan-tooling/ui';

export const Footer = ({ children }) => (
    <Region as="footer">
        <RegionInner additionalClassNames="c-footer__container u-text--center">
            <Heading type="h5">
                Proudly Made With ❤️ by{' '}
                <Anchor target="_blank" href="https://twitter.com/mattclaffey1">
                    Matthew Claffey
                </Anchor>{' '}
                🚀
            </Heading>
        </RegionInner>
    </Region>
);
