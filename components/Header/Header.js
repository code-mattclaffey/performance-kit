import React from 'react';
import Link from 'next/link';
import { Region, RegionInner } from '@titan-tooling/ui';
import { HOME_URL_LINK } from '../../constants';

export const HeadingHighlight = ({ children, highlightColor, additionalClassNames }) => (
    <span
        className={`c-header__heading-highlight ${additionalClassNames}`}
        style={{
            '--header-highlight-color': highlightColor,
        }}
    >
        {children}
    </span>
);

export const Header = ({ children }) => (
    <Region
        as="header"
        style={{
            '--region-bg': 'var(--primary)',
            '--region-text-color': 'var(--white)',
        }}
    >
        <RegionInner additionalClassNames="c-header__container">
            <div className="c-header__rocket">
                <Link href="/">
                    <a aria-label={HOME_URL_LINK} title={HOME_URL_LINK} className="c-header__rocket-link">
                        🚀
                    </a>
                </Link>
            </div>
            <div>{children}</div>
        </RegionInner>
    </Region>
);
