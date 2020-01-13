import React, { useRef } from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import useScrollIntoView from '../../hooks/useScrollIntoView';

const styleSheet: StyleSheet = ({ color, font, pattern, unit }) => ({
  button: {
    ...pattern.resetButton,
    background: color.accent.bg,
    display: 'block',
    padding: `${unit}px ${unit * 2}px`,
    width: '100%',
    textAlign: 'left',

    ':hover': {
      background: color.accent.bgHover,
    },
  },

  button_active: {
    color: color.base,
    background: color.core.primary[3],

    ':hover': {
      background: color.core.primary[4],
    },
  },

  name: {
    fontWeight: font.weights.semibold,
  },

  status: {
    fontWeight: 'normal',
    display: 'inline-block',
    marginLeft: unit / 2,
  },

  description: {
    opacity: 0.75,
  },
});

export type SelectionProps = {
  active: boolean;
  description?: string;
  name: string;
  status?: string;
  onClick: () => void;
};

export default function Selection({ active, description, name, status, onClick }: SelectionProps) {
  const [styles, cx] = useStyles(styleSheet);
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
