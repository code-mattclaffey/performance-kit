import React from 'react';
import { Region, RegionInner } from '@titan-tooling/ui';

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
            <div className="c-header__rocket">🚀</div>
            <div>{children}</div>
        </RegionInner>
    </Region>
);
