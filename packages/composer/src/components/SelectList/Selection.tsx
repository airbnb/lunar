import React, { useRef } from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import useScrollIntoView from '../../hooks/useScrollIntoView';
import { selectListItemStyleSheet } from '../../styles';

export type SelectionProps = {
  active: boolean;
  description?: string;
  name: string;
  status?: string;
  onClick: () => void;
};

export default function Selection({ active, description, name, status, onClick }: SelectionProps) {
  const [styles, cx] = useStyles(selectListItemStyleSheet);
  const ref = useRef<HTMLLIElement | null>(null);

  // Passive hooks
  useScrollIntoView(ref.current, active);

  return (
    <li ref={ref}>
      <button
        className={cx(styles.button, active && styles.button_active)}
        type="button"
        onClick={onClick}
      >
        <div className={cx(styles.name)}>
          {name}
          {status && <span className={cx(styles.status)}>{status}</span>}
        </div>

        {description && <div className={cx(styles.description)}>{description}</div>}
      </button>
    </li>
  );
}
