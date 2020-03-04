import React from 'react';
import Text from '../Text';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetDivider } from './styles';

export type LabeledDividerProps = {
  /** A label for the divider. Typically a string or i18n T node. */
  label: NonNullable<React.ReactNode>;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A horizontal divider with a label. */
export default function LabeledDivider({ label, styleSheet }: LabeledDividerProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetDivider);

  return (
    <div className={cx(styles.rule)}>
      <Text small bold inline>
        {label}
      </Text>
    </div>
  );
}
