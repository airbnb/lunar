import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = ({ unit }) => ({
  tip: {
    display: 'inline-block',
    marginLeft: unit,
    marginBottom: 2,
  },
});

export type TipProps = {
  children: NonNullable<React.ReactNode>;
};

export default function Tip({ children }: TipProps) {
  const [styles, cx] = useStyles(styleSheet);

  return <span className={cx(styles.tip)}>{children}</span>;
}
