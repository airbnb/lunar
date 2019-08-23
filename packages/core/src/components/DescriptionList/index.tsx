import React from 'react';
import Description from './Description';
import Term from './Term';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Spacing from '../Spacing';
import Text from '../Text';

export { Description };
export { Term };

function DescriptionList({
  horizontal,
  children,
  cx,
  styles,
}: {
  horizontal?: boolean;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  return (
    <dl className={cx(styles.wrapper, horizontal && styles.wrapper_horizontal)}>{children}</dl>
  );
}

export default withStyles(({ unit }) => ({
  wrapper: {
    '@selectors': {
      '> dd': {
        display: 'block',
        marginInlineStart: 0,
        marginBottom: 2 * unit,
      },
      '> dd:last-of-type': {
        margin: 0,
      },
    },
  },
  wrapper_horizontal: {
    display: 'inline-flex',
  },
}))(DescriptionList);
