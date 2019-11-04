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
  return (
    <dl className={cx(styles.termList, inline && styles.horizontal, !inline && styles.vertical)}>
      {children}
    </dl>
  );
}

export default withStyles(({ unit, font }) => ({
  horizontal: {
    // display: 'inline-flex',
    display: 'inline-grid',
    gridAutoFlow: 'column',
    gridTemplateRows: `repeat(2, 1fr)`,
    flexWrap: 'wrap',
    '@selectors': {
      // '> div': {
      // display: 'inline-block',
      // },
      // '> div:not(:last-child)': {
      // marginRight: unit * 4,
      // marginBottom: unit * 2,
      // },
      '> dd:not(:last-child), > dt:not(:last-child)': {
        marginRight: unit * 4,
      },
    },
  },
  vertical: {
    '@selectors': {
      '> dd:not(:last-child)': {
        marginBottom: unit * 2,
      },
    },
  },
  termList: {
    // Reset dl styles
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
}))(TermList);
