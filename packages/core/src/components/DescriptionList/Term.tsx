import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Text from '../Text';

function Term({
  label,
  link,
  endAlign,
  inline,
  keyTextRegular,
  children,
  cx,
  styles,
}: {
  label: string;
  link?: NonNullable<React.ReactNode>;
  endAlign?: boolean;
  inline?: boolean;
  keyTextRegular?: boolean;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  return (
    <div>
      <Text small>{label}</Text>
      <Text>{children}</Text>
    </div>
  );
}

export default withStyles(() => ({
  inline: {
    display: 'inline-block',
  },
}))(Term);
