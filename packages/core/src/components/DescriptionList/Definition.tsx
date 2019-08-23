import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Text from '../Text';

function Definition({
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
  return <Text>{children}</Text>;
}

export default withStyles(() => ({
  inline: {
    display: 'inline-block',
  },
}))(Definition);
