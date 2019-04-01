import React from 'react';
import withStyles, { css, WithStylesProps } from '../../../composers/withStyles';
import FocusTrap from '../../FocusTrap';
import focusFirstFocusableChild from '../../../utils/focus/focusFirstFocusableChild';
import ModalImageLayout, { ModalImageConfig } from './ImageLayout';
import ModalInnerContent, { Props as ModalInnerContentProps } from './InnerContent';

export const MODAL_MAX_WIDTH_SMALL = 568;

export type Props = ModalInnerContentProps & {
  /** Image configuration to be used as the right pane in a dual pane layout. If provided, will force the modal to a `large` layout. */
  image?: ModalImageConfig;
};

/** A Dialog component with a backdrop and a standardized layout. */
export class ModalInner extends React.Component<Props & WithStylesProps> {
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

    if (current && current.contains(event.target as any)) {
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

  private handleClose = (event: React.MouseEvent<any> | React.KeyboardEvent) => {
    const { onClose } = this.props;
    onClose(event);
  };

  render() {
    const { children, footer, image, large, styles, title } = this.props;
    const showLargeContent = large || !!image;

    const innerContent = (
      <ModalInnerContent
        footer={footer}
        large={showLargeContent}
        onClose={this.handleClose}
        title={title}
      >
        {children}
      </ModalInnerContent>
    );

    return (
      <div
        aria-modal
        role="dialog"
        ref={this.dialogRef}
        {...css(styles.content, showLargeContent && styles.responsiveContent)}
      >
        <FocusTrap>
          {image ? <ModalImageLayout {...image}>{innerContent}</ModalImageLayout> : innerContent}
        </FocusTrap>
      </div>
    );
  }
}

export default withStyles(({ color, responsive, ui }) => ({
  content: {
    backgroundColor: color.accent.bg,
    maxWidth: MODAL_MAX_WIDTH_SMALL,
    position: 'relative',
    width: '100%',
    boxShadow: ui.boxShadowLarge,
    borderRadius: ui.borderRadius,

    ':focus': {
      outline: 'none',
    },
  },

  responsiveContent: {
    maxWidth: '70%',

    '@media': {
      [responsive.small]: {
        maxWidth: MODAL_MAX_WIDTH_SMALL,
      },
    },
  },
}))(ModalInner);
