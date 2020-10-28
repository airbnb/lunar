import React, { useRef, useCallback, useEffect } from 'react';
import useStyles from '../../../hooks/useStyles';
import FocusTrap from '../../FocusTrap';
import focusFirstFocusableChild from '../../../utils/focus/focusFirstFocusableChild';
import ModalImageLayout, { ModalImageConfig } from './ImageLayout';
import ModalInnerContent, { ModalInnerContentProps } from './InnerContent';
import {
  styleSheetInner,
  MODAL_MAX_WIDTH_SMALL,
  MODAL_MAX_WIDTH_MEDIUM,
  MODAL_MAX_WIDTH_LARGE,
} from '../styles';

export { MODAL_MAX_WIDTH_SMALL, MODAL_MAX_WIDTH_MEDIUM, MODAL_MAX_WIDTH_LARGE };

export type ModalInnerProps = ModalInnerContentProps & {
  /** Image configuration to be used as the right pane in a dual pane layout. If provided, will force the modal to a `large` layout. */
  image?: ModalImageConfig;
  /** Fluid width, no max width. */
  fluid?: boolean;
  /** Keep modal open when clicking outside of the modal (in the blackout). */
  persistOnOutsideClick?: boolean;
};

/** A Dialog component with a backdrop and a standardized layout. */
export default function ModalInner({
  styleSheet,
  onClose,
  children,
  footer,
  image,
  large,
  small,
  fluid,
  scrollable,
  subtitle,
  title,
  topBar,
  topBarCentered,
  persistOnOutsideClick,
}: ModalInnerProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetInner);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const openTimeoutRef = useRef<number>();

  const handleClose = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      onClose(event);
    },
    [onClose],
  );

  useEffect(() => {
    lastActiveElementRef.current = document.activeElement as HTMLElement;

    // Putting this in a setTimeout helps screen readers notice that focus has changed.
    openTimeoutRef.current = window.setTimeout(() => {
      const { current: dialogRefElement } = dialogRef;

      if (dialogRefElement) {
        focusFirstFocusableChild(dialogRefElement);
      }
    }, 0);

    return () => {
      if (openTimeoutRef.current) {
        window.clearTimeout(openTimeoutRef.current);
      }
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent | MouseEvent) => {
      const { current } = dialogRef;

      if (current?.contains(event.target as Element) || persistOnOutsideClick) {
        return;
      }

      handleClose(event as React.MouseEvent);
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClose, persistOnOutsideClick]);

  const showLargeContent = large || !!image;

  const innerContent = (
    <ModalInnerContent
      footer={footer}
      large={showLargeContent}
      small={small}
      scrollable={scrollable}
      subtitle={subtitle}
      title={title}
      topBar={topBar}
      topBarCentered={topBarCentered}
      onClose={handleClose}
    >
      {children}
    </ModalInnerContent>
  );

  return (
    <div
      ref={dialogRef}
      aria-modal
      role="dialog"
      className={cx(
        styles.content,
        small && styles.content_small,
        showLargeContent && styles.content_large,
        fluid && styles.content_fluid,
      )}
    >
      <FocusTrap>
        {image ? <ModalImageLayout {...image}>{innerContent}</ModalImageLayout> : innerContent}
      </FocusTrap>
    </div>
  );
}
