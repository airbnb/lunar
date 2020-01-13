import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = ({ color, ui, unit }) => ({
  mark: {
    border: ui.border,
    borderColor: color.core.neutral[2],
    borderRadius: ui.borderRadius,
    background: color.core.neutral[0],
    color: color.core.neutral[4],
    paddingLeft: unit / 2,
    paddingRight: unit / 2,
    paddingBottom: 1,
    marginRight: unit / 2,
    display: 'inline-block',
  },
});

export type MarkProps = {
  children?: React.ReactNode;
};

export default function Mark({ children }: MarkProps) {
  const [styles, cx] = useStyles(styleSheet);

  return <mark className={cx(styles.mark)}>{children}</mark>;
}
