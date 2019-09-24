import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Term from './Term';

export { Term };

function TermList({
  inline,
  children,
  cx,
  styles,
}: {
  link?: NonNullable<React.ReactNode>;
  endAlign?: boolean;
  inline?: boolean;
  keyTextRegular?: boolean;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  return <dl className={cx(inline && styles.inline, styles.termList)}>{children}</dl>;
}

export default withStyles(({ unit }) => ({
  inline: {
    display: 'inline-block',
  },
  termList: {
    // Reset dl styles
    marginBlockStart: 0,
    marginBlockEnd: 0,
    '@selectors': {
      '> div:not(:last-child) > dd': {
        marginBottom: unit * 2,
      },
    },
  },
}))(TermList);
