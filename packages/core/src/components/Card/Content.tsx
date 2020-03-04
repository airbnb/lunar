import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Row from '../Row';
import Spacing from '../Spacing';
import { styleSheetContent } from './styles';
import ButtonOrLink from '../private/ButtonOrLink';
import CardSide from './private/Side';

export type CardContentProps = {
  /** Content to display following the primary content. */
  after?: React.ReactNode;
  /** Content to display before the primary content. */
  before?: React.ReactNode;
  /** Content to display. */
  children: NonNullable<React.ReactNode>;
  /** Decrease padding. */
  compact?: boolean;
  /** Max height of content. */
  maxHeight?: number | string;
  /** Align contents in the middle vertically. */
  middleAlign?: boolean;
  /** Min height of content. */
  minHeight?: number | string;
  /** Remove padding around after content. */
  noPaddingAfter?: boolean;
  /** Remove padding around before content. */
  noPaddingBefore?: boolean;
  /** Remove padding around top content. */
  noPaddingTop?: boolean;
  /** Content to display above the primary content. */
  top?: React.ReactNode;
  /** To use with text truncation; overflow is hidden. */
  truncated?: boolean;
  /** If provided, makes the after content clickable, firing this callback. */
  onAfterClick?: () => void;
  /** If provided, makes the before content clickable, firing this callback. */
  onBeforeClick?: () => void;
  /** If provided, makes the entire content clickable, firing this callback. */
  onClick?: () => void;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Content block within a card. */
export default function CardContent({
  after,
  before,
  children,
  compact,
  maxHeight,
  middleAlign,
  minHeight,
  noPaddingAfter,
  noPaddingBefore,
  noPaddingTop,
  onClick,
  top,
  truncated,
  onAfterClick,
  onBeforeClick,
  styleSheet,
}: CardContentProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetContent);
  const ContainerTag = onClick ? 'button' : 'div';
  const containerProps = onClick ? { type: 'button', onClick } : {};
  const spacing = compact ? 1.5 : 3;
  const horizontalSpacing = compact ? 0 : 1;

  let afterContent = after ? (
    <CardSide
      type="after"
      compact={compact}
      middleAlign={middleAlign}
      noPadding={noPaddingAfter}
      styleSheet={styleSheet}
    >
      {after}
    </CardSide>
  ) : null;

  if (afterContent && onAfterClick) {
    afterContent = (
      <ButtonOrLink className={cx(styles.sideButton)} onClick={onAfterClick}>
        {afterContent}
      </ButtonOrLink>
    );
  }

  let beforeContent = before ? (
    <CardSide
      type="before"
      compact={compact}
      middleAlign={middleAlign}
      noPadding={noPaddingBefore}
      styleSheet={styleSheet}
    >
      {before}
    </CardSide>
  ) : null;

  if (beforeContent && onBeforeClick) {
    beforeContent = (
      <ButtonOrLink className={cx(styles.sideButton)} onClick={onBeforeClick}>
        {beforeContent}
      </ButtonOrLink>
    );
  }

  return (
    // @ts-ignore [ts] JSX element type 'ContainerTag' does not have any construct or call signatures. [2604]
    <ContainerTag
      {...containerProps}
      className={cx(styles.container, onClick && styles.container_button)}
    >
      {top && (
        <Spacing inner horizontal={noPaddingTop ? 0 : spacing} top={noPaddingTop ? 0 : spacing}>
          {top}
        </Spacing>
      )}

      <Row
        after={afterContent}
        before={beforeContent}
        maxHeight={maxHeight}
        middleAlign={middleAlign}
        minHeight={minHeight}
        truncated={truncated}
      >
        <Spacing
          inner
          left={beforeContent ? horizontalSpacing : spacing}
          right={afterContent ? horizontalSpacing : spacing}
          vertical={spacing}
        >
          {children}
        </Spacing>
      </Row>
    </ContainerTag>
  );
}
