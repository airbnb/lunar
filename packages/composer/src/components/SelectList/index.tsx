import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Selection from './Selection';
import { selectListStyleSheet } from '../../styles';

export type SelectListProps = {
  children?: React.ReactNode;
  noResults: NonNullable<React.ReactNode>;
  title?: React.ReactNode;
};

export { Selection };

export default function SelectList({ children, noResults, title }: SelectListProps) {
  const [styles, cx] = useStyles(selectListStyleSheet);
  const childCount = React.Children.count(children);

  return (
    <ul className={cx(styles.list)}>
      {title && <li className={cx(styles.row)}>{title}</li>}

      {childCount > 0 ? children : <li className={cx(styles.row)}>{noResults}</li>}
    </ul>
  );
}
