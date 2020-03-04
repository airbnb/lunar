import React from 'react';
import useStyles, { StyleSheet } from '../../../hooks/useStyles';
import { styleSheetContent } from '../styles';
import { CardContentProps } from '../Content';

type CardSideProps = Partial<Pick<CardContentProps, 'children' | 'compact' | 'middleAlign'>> & {
  noPadding?: boolean;
  type: 'before' | 'after';
  styleSheet?: StyleSheet;
};

export default function CardSide({
  children,
  compact,
  middleAlign,
  noPadding,
  type,
  styleSheet,
}: CardSideProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetContent);
  const isAfter = type === 'after';
  const isBefore = type === 'before';

  return (
    <div
      className={cx(
        styles.side,
        middleAlign && styles.side_middleAlign,
        compact && styles.side_compact,
        isAfter && styles.after,
        compact && isAfter && styles.after_compact,
        isBefore && styles.before,
        compact && isBefore && styles.before_compact,
        noPadding && styles.side_noPadding,
      )}
    >
      {children}
    </div>
  );
}
