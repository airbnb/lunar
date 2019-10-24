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
  inline?: boolean;
  small?: boolean;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  2;
  return <dl className={cx(styles.termList, inline && styles.inline)}>{children}</dl>;
}

export default withStyles(({ unit, font }) => ({
  inline: {
    // display: 'inline-flex',
    '@selectors': {
      '> dd': {
        // display: 'inline-block',
      },
      '> dt': {
        // display: 'inline-block',
      },
    },
  },
  termList: {
    // Reset dl styles
    marginBlockStart: 0,
    marginBlockEnd: 0,
    '@selectors': {
      '> dd:not(:last-child)': {
        marginBottom: unit * 2,
      },
    },
  },
}))(TermList);
