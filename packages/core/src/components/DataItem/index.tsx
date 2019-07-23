import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Text from '../Text';

function DataItem({
  label,
  link,
  endAlign,
  inline,
  children,
  cx,
  styles,
}: {
  label: string;
  link?: NonNullable<React.ReactNode>;
  endAlign?: boolean;
  inline?: boolean;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  return (
    <div className={cx(inline && styles.inline)}>
      <div className={cx(styles.wrapper, endAlign && styles.wrapper_endAlign)}>
        <Spacing right={1}>
          <Text small muted>
            {label}
          </Text>
        </Spacing>

        {link && (
          <Text small muted>
            {link}
          </Text>
        )}
      </div>

      <Text>{children}</Text>
    </div>
  );
}

export default withStyles(() => ({
  inline: {
    display: 'inline-block',
  },

  wrapper: {
    display: 'flex',
  },

  wrapper_endAlign: {
    justifyContent: 'space-between',
  },
}))(DataItem);
