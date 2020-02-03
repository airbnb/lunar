import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Term from './Term';

export { Term };

export type Props = {
  /** If enabled, terms are laid out horizontally. */
  horizontal?: boolean;
  children: NonNullable<React.ReactNode>;
};

function TermList({ horizontal, children, cx, styles }: Props & WithStylesProps) {
  return (
    <dl
      className={cx(
        styles.termList,
        !horizontal && styles.termList_vertical,
        horizontal && styles.termList_horizontal,
      )}
    >
      {children}
    </dl>
  );
}

export default withStyles(({ unit, font }) => ({
  termList: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  termList_vertical: {
    '@selectors': {
      '> div:not(:last-child)': {
        marginBottom: unit * 2,
      },
    },
  },
  termList_horizontal: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    '@selectors': {
      '> div:not(:last-child)': {
        marginRight: unit * 6,
      },
    },
  },
}))(TermList);
