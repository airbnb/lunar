import React from 'react';
import Text from '../Text';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';

export type LabeledDividerProps = {
  /** A label for the divider. Typically a string or i18n T node. */
  label: NonNullable<React.ReactNode>;
};

/** A horizontal divider with a label. */
export default function LabeledDivider({ label }: LabeledDividerProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.rule)}>
      <Text small bold inline>
        {label}
      </Text>
    </div>
  );
}
