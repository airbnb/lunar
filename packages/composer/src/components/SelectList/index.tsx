import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import Selection from './Selection';

const styleSheet: StyleSheet = ({ unit }) => ({
  list: {
    margin: 0,
    padding: 0,
    maxHeight: 200,
    listStyle: 'none',
    overflow: 'auto',
  },

  row: {
    padding: `${unit}px ${unit * 2}px`,
  },
});

export type SelectListProps = {
  children?: React.ReactNode;
  noResults: NonNullable<React.ReactNode>;
  title?: React.ReactNode;
};

export { Selection };

export default function SelectList({ children, noResults, title }: SelectListProps) {
  const [styles, cx] = useStyles(styleSheet);
  const childCount = React.Children.count(children);

  return (
    <ul className={cx(styles.list)}>
      {title && <li className={cx(styles.row)}>{title}</li>}

      {childCount > 0 ? children : <li className={cx(styles.row)}>{noResults}</li>}
    </ul>
  );
}
