import React, { useRef } from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import { ProofreadConfig } from '../../types';

export const styleSheet: StyleSheet = ({ color, ui }) => ({
  mark: {
    position: 'relative',
    color: 'inherit',
    backgroundColor: 'transparent',
    padding: 1,
    margin: -1,
    transition: 'opacity .2s, background .2s',
    cursor: 'pointer',

    '::after': {
      position: 'absolute',
      display: 'block',
      content: '""',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      borderRadius: ui.borderRadius,
      backgroundColor: color.core.danger[2],
    },
  },

  mark_highlight: {
    borderRadius: ui.borderRadius,
    backgroundColor: color.core.danger[1],

    '::after': {
      display: 'none',
    },
  },

  markSecondary: {
    '::after': {
      backgroundColor: color.core.warning[2],
    },
  },

  markSecondary_highlight: {
    backgroundColor: color.core.warning[1],
  },

  button: {
    display: 'inline',
    background: 'none',
    margin: 0,
    padding: 0,
    border: 0,
    whiteSpace: 'nowrap',
  },
});

export type MarkProps = {
  children: string;
  error: ProofreadConfig;
  highlighted?: boolean;
  secondary?: boolean;
  selected?: boolean;
  onClick: (error: ProofreadConfig, top: number, left: number) => void;
};

export default function Mark({
  children,
  error,
  highlighted,
  secondary,
  selected,
  onClick,
}: MarkProps) {
  const [styles, cx] = useStyles(styleSheet);
  const ref = useRef<HTMLSpanElement | null>(null);
  const active = highlighted || selected;

  return (
    <button
      className={cx(styles.button)}
      type="button"
      onClick={() => {
        if (ref.current) {
          onClick(error, ref.current.offsetTop + ref.current.offsetHeight, ref.current.offsetLeft);
        }
      }}
    >
      <mark
        ref={ref}
        className={cx(
          styles.mark,
          active && styles.mark_highlight,
          secondary && styles.markSecondary,
          secondary && active && styles.markSecondary_highlight,
        )}
      >
        {children}
      </mark>
    </button>
  );
}
