import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Term from './Term';

export { Term };

export type Props = {
  children: NonNullable<React.ReactNode>;
};

function TermList({ children, cx, styles }: Props & WithStylesProps) {
  return <dl className={cx(styles.termList)}>{children}</dl>;
}

export default withStyles(({ unit, font }) => ({
  termList: {
    // Reset dl styles
    marginBlockStart: 0,
    marginBlockEnd: 0,
    '@selectors': {
      '> dd': {
        // Reset dd styles
        marginInlineStart: 0,
        '@selectors': {
          ':not(:last-child)': {
            marginBottom: unit * 2,
          },
        },
      },
    },
  },
}))(TermList);
