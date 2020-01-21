import React, { useRef } from 'react';
import useStyles from '../../hooks/useStyles';
import { ProofreadRuleMatch } from './types';
import { markStyleSheet } from './styles';

export type MarkProps = {
  children: string;
  error: ProofreadRuleMatch;
  highlighted?: boolean;
  secondary?: boolean;
  selected?: boolean;
  onClick: (error: ProofreadRuleMatch, top: number, left: number) => void;
};

export default function Mark({
  children,
  error,
  highlighted,
  secondary,
  selected,
  onClick,
}: MarkProps) {
  const [styles, cx] = useStyles(markStyleSheet);
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
