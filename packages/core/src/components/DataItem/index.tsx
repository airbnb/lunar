import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Text from '../Text';

function DataItem({
  label,
  link,
  floatLinkRight,
  inline,
  children,
  cx,
  styles,
}: {
  label: string;
  link?: NonNullable<React.ReactNode>;
  floatLinkRight?: boolean;
  inline?: boolean;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  return (
    <div className={cx(inline && styles.data_item_inline)}>
      <Text inline small muted>
        {label}
      </Text>
      {link && (
        <div className={cx(floatLinkRight && styles.link_float_right, styles.link)}>
          <Text inline small muted>
            {link}
          </Text>
        </div>
      )}
      <Text>{children}</Text>
    </div>
  );
}

export default withStyles(() => ({
  data_item_inline: {
    display: 'inline-block',
  },
  link_float_right: {
    float: 'right',
  },
  link: {
    display: 'inline-block',
  },
}))(DataItem);
