import React from 'react';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import FocusTrap from '../../FocusTrap';
import focusFirstFocusableChild from '../../../utils/focus/focusFirstFocusableChild';
import ModalImageLayout, { ModalImageConfig } from './ImageLayout';
import ModalInnerContent, { ModalInnerContentProps } from './InnerContent';
import {
  styleSheetInner as styleSheet,
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
export class ModalInner extends React.Component<ModalInnerProps & WithStylesProps> {
  dialogRef = React.createRef<HTMLDivElement>();

  lastActiveElement: HTMLElement | null = null;

  openTimeout?: number;

  componentDidMount() {
    this.handleOpen();

    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);

    if (this.openTimeout) {
      window.clearTimeout(this.openTimeout);
    }

    if (this.lastActiveElement) {
      this.lastActiveElement.focus();
    }
  }

  private handleClickOutside = (event: React.MouseEvent | MouseEvent) => {
    const { current } = this.dialogRef;

    if (current?.contains(event.target as Element) || this.props.persistOnOutsideClick) {
      return;
    }

    this.handleClose(event as React.MouseEvent);
  };

  private handleOpen = () => {
    this.lastActiveElement = document.activeElement as HTMLElement;

    // Putting this in a setTimeout helps screen readers notice that focus has changed.
    this.openTimeout = window.setTimeout(() => {
      const { current: dialogRefElement } = this.dialogRef;

      if (dialogRefElement) {
        focusFirstFocusableChild(dialogRefElement);
      }
    }, 0);
  };

  private handleClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    const { onClose } = this.props;
    onClose(event);
  };

  render() {
    const {
      cx,
      children,
      footer,
      image,
      large,
      small,
      fluid,
      scrollable,
      styles,
      subtitle,
      title,
      topBar,
      topBarCentered,
    } = this.props;

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
        onClose={this.handleClose}
      >
        {children}
      </ModalInnerContent>
    );

    return (
      <div
        ref={this.dialogRef}
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
}

export default withStyles(styleSheet)(ModalInner);
