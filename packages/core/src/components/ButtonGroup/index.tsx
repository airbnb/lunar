import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';

export type ButtonGroupProps = {
  /** List of components to group. */
  children: NonNullable<React.ReactNode>;
  /** Horizontally align the buttons to the end (flex-end). */
  endAlign?: boolean;
  /** Stack the buttons vertically. */
  stacked?: boolean;
  /** Stretch buttons to fill the space. */
  stretched?: boolean;
};

/** Horizontally align `Button`s with a consistent gutter between each. */
export default function ButtonGroup({ children, endAlign, stacked, stretched }: ButtonGroupProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div
      className={cx(
        styles.buttonGroup,
        endAlign && styles.buttonGroup_endAlign,
        stacked && styles.buttonGroup_stacked,
      )}
    >
      {React.Children.map(children, child =>
        child ? (
          <div
            className={cx(
              styles.cell,
              stacked && styles.cell_stacked,
              stretched && styles.cell_stretched,
            )}
          >
            {child}
          </div>
        ) : null,
      )}
    </div>
  );
}
