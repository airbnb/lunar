import React, { useRef, useEffect, useCallback } from 'react';
import useStyles from '../../hooks/useStyles';
import { ProofreadRuleMatch } from './types';
import { markStyleSheet } from './styles';

export type MarkProps = {
  children: string;
  error: ProofreadRuleMatch;
  highlighted?: boolean;
  secondary?: boolean;
  selected?: boolean;
  shadow?: boolean;
  onSelect: (error: ProofreadRuleMatch, top: number, left: number) => void;
};

export default function Mark({
  children,
  error,
  highlighted,
  secondary,
  selected,
  shadow = false,
  onSelect,
}: MarkProps) {
  const [styles, cx] = useStyles(markStyleSheet);
  const ref = useRef<HTMLSpanElement | null>(null);
  const active = highlighted || selected;

  const handleSelect = useCallback(() => {
    if (ref.current) {
      onSelect(error, ref.current.offsetTop + ref.current.offsetHeight, ref.current.offsetLeft);
    }
  }, [error, onSelect]);

  // When being used as a shadow, the mark cannot be clicked.
  // So we automatically fire the handler when selected state changes.
  useEffect(() => {
    if (shadow && selected) {
      handleSelect();
    }
  }, [shadow, selected, handleSelect]);

  return (
    <button className={cx(styles.button)} type="button" onClick={handleSelect}>
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
