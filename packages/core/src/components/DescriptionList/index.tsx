import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Term from './Term';
import Definition from './Definition';

export { Term };
export { Definition };

import Spacing from '../Spacing';
import Text from '../Text';

function DescriptionList({
  link,
  endAlign,
  inline,
  keyTextRegular,
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
  return <div className={cx(inline && styles.inline)}>{children}</div>;
}

export default withStyles(() => ({
  inline: {
    display: 'inline-block',
  },
}))(DescriptionList);
