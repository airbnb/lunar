import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';

export type Props = {
  /** List of components to group. */
  children: NonNullable<React.ReactNode>;
  /** Horizontally align the buttons to the end (flex-end). */
  endAlign?: boolean;
  /** Stack the buttons vertically. */
  stacked?: boolean;
};

/** Horizontally align `Button`s with a consistent gutter between each. */
export default function ButtonGroup({ children, endAlign, stacked }: Props) {
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
          <div className={cx(stacked ? styles.cell_stacked : styles.cell)}>{child}</div>
        ) : null,
      )}
    </div>
  );
}
