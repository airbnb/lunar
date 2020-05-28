/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { v4 as uuid } from 'uuid';
import Text from '../Text';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { styleSheetPopover } from './styles';
import Portal from '../Portal';
const EMPTY_TARGET_RECT: ClientRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
};
export type PopoverProps = {
  /** Accessibility label. If not specified, all popover content is duplicated, rendered in an off-screen element with a separate layer. */
  accessibilityLabel?: string;
  /** Inline content to hover. */
  children: NonNullable<React.ReactNode>;
  /** What to show in the popover. */
  content: NonNullable<React.ReactNode>;
  /** True to disable popover but still show children. */
  disabled?: boolean;
  /** Manually override calculated horizontal align */
  horizontalAlign?: 'center' | 'left' | 'right';
  /** True to use a light background with dark text. */
  inverted?: boolean;
  /** Number of seconds the cursor must hover over the trigger to trigger the popoover */
  mouseEnterDelay?: number;
  /** Number of seconds popover will persist if you do not move your cursor into the popover. */
  mouseLeaveDelay?: number;
  /** Callback fired when the popover is shown. */
  onShow?: () => void;
  /** True to prevent dismissmal on mouse down. */
  remainOnMouseDown?: boolean;
  /** True to toggle popover display on click.  */
  toggleOnClick?: boolean;
  /** True to add a dotted bottom border. */
  underlined?: boolean;
  /** Manually override calculated vertical align */
  verticalAlign?: 'above' | 'below';
  /** Width of the popover in units. */
  width?: number;
};
export type PopoverState = {
  labelID: string;
  open: boolean;
  popoverHeight: number;
  targetRect: ClientRect;
  targetRectReady: boolean;
};
export type PositionStruct = {
  above: boolean;
  align: 'left' | 'center' | 'right';
};
export type StyleStruct = {
  center: string | number;
  right: string | number;
};
/** A simple popover component */
export class Popover extends React.Component<PopoverProps & WithStylesProps, PopoverState> {
  static inverted: boolean = false;
  static defaultProps = {
    disabled: false,
    inverted: false,
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    onShow() {},
    remainOnMouseDown: false,
    toggleOnClick: false,
    underlined: false,
    width: 35,
  };
  state = {
    labelID: uuid(),
    open: false,
    popoverHeight: 0,
    targetRect: EMPTY_TARGET_RECT,
    targetRectReady: false,
  };
  containerRef = React.createRef<HTMLSpanElement>();
  currentPopoverRef: HTMLDivElement | null = null;
  mounted: boolean = false;
  rafHandle: number = 0;
  delayTimer: number | null = null;
  static getDerivedStateFromProps({ disabled }: PopoverProps) {
    if (disabled) {
      return {
        open: false,
      };
    }
    return null;
  }
  componentDidMount() {
    this.mounted = true;
    this.rafHandle = requestAnimationFrame(() => {
      const targetRect = document.body.getBoundingClientRect();
      // use a second rAF in case setState causes layout thrashing
      this.rafHandle = requestAnimationFrame(() => {
        this.setState({ targetRect, targetRectReady: true });
      });
    });
  }
  componentDidUpdate(prevProps: PopoverProps) {
    if (prevProps.content !== this.props.content) {
      this.updatePopoverHeight();
    }
  }
  componentWillUnmount() {
    this.mounted = false;
    cancelAnimationFrame(this.rafHandle);
  }
  updatePopoverHeight() {
    // we need to know the height of the popover to position it above target
    /* istanbul ignore next: refs are hard */
    this.rafHandle = requestAnimationFrame(() => {
      const el = this.currentPopoverRef;
      if (this.mounted) {
        this.setState({ popoverHeight: el ? el.offsetHeight : 0 });
      }
    });
  }
  bestPosition(rect: PopoverState['targetRect']): PositionStruct {
    const output: PositionStruct = { above: false, align: 'left' };
    const { width: widthProp, theme } = this.props;
    /* istanbul ignore next: refs are hard */
    if (rect && widthProp && theme) {
      const { width: targetWidth, left, right, top } = rect;
      const { unit } = theme;
      const rightSpace = window.innerWidth - right;
      if (top > window.innerHeight * 0.6) {
        output.above = true;
      }
      if (Math.min(left, rightSpace) - unit > (widthProp * unit - targetWidth) / 2) {
        output.align = 'center';
      } else if (rightSpace < left) {
        output.align = 'right';
      }
    }
    return output;
  }
  private handlePopoverRef = (ref: HTMLDivElement | null) => {
    this.currentPopoverRef = ref;
    this.updatePopoverHeight();
  };
  private handleOpen = () => {
    /* istanbul ignore next: refs are hard */
    this.rafHandle = requestAnimationFrame(() => {
      const { current } = this.containerRef;
      /* istanbul ignore if: refs are hard */
      if (current && this.mounted) {
        this.setState({ targetRect: current.getBoundingClientRect() });
      }
    });
    if (!this.props.disabled && !this.state.open) {
      this.setState({ open: true });
      this.props.onShow!();
    }
  };
  private handleClose = () => {
    this.setState({ open: false });
  };
  private handleMouseEnter = () => {
    if (!this.props.toggleOnClick) {
      this.delaySetPopupVisible(true, this.props.mouseEnterDelay || 0);
    }
  };
  private handleMouseDown = () => {
    if (!this.props.remainOnMouseDown && !this.props.toggleOnClick) {
      this.handleClose();
    }
    if (this.props.toggleOnClick) {
      if (this.state.open) {
        this.handleClose();
      } else {
        this.handleOpen();
      }
    }
  };
  private handleMouseLeave = () => {
    if (!this.props.toggleOnClick) {
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay || 0.1);
    }
  };
  /**
   * @param popupVisible    Show or not the popup element
   */
  setPopupVisible(open: boolean) {
    const { open: previousOpen } = this.state;
    this.clearDelayTimer();
    if (previousOpen !== open) {
      if (open === false) {
        this.handleClose();
      } else {
        this.handleOpen();
      }
    }
  }
  clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }
  delaySetPopupVisible(open: boolean, delayS: number) {
    const delay = delayS * 1000;
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = window.setTimeout(() => {
        this.setPopupVisible(open);
        this.clearDelayTimer();
      }, delay);
    } else {
      this.setPopupVisible(open);
    }
  }
  handlePopupMouseEnter = () => {
    this.clearDelayTimer();
  };
  handlePopupMouseLeave = () => {
    this.delaySetPopupVisible(false, 0.1);
  };
  private renderPopUp() {
    const {
      horizontalAlign,
      cx,
      styles,
      theme,
      width: widthProp,
      content,
      inverted,
      verticalAlign,
    } = this.props;
    const { open, targetRect, popoverHeight, targetRectReady } = this.state;
    // render null until targetRect is initialized by cDM
    if (!targetRectReady) {
      return null;
    }
    const { unit } = theme!;
    const width = widthProp! * unit;
    // bestPosition will cause a reflow as will `targetRect.width`
    const { align: bestAlign, above: bestAbove } = this.bestPosition(targetRect);
    const align = horizontalAlign ?? bestAlign;
    const above = verticalAlign ? verticalAlign === 'above' : bestAbove;
    const targetWidth = targetRect.width;
    const marginLeft: StyleStruct = {
      center: -width / 2 + targetWidth / 2,
      right: -width + targetWidth,
    };
    const distance = unit / 2;
    const invert = inverted || Popover.inverted;
    return (
      open && (
        <div style={{ position: 'absolute', zIndex: 1 }}>
          <div
            ref={this.handlePopoverRef}
            role="tooltip"
            className={cx(styles.popover, above ? styles.popover_above : styles.popover_below, {
              width,
              marginLeft: marginLeft[align as keyof StyleStruct],
              marginTop: above ? -(popoverHeight + targetRect.height + distance) : distance,
              textAlign: align,
            })}
          >
            <div
              className={cx(styles.content, invert && styles.content_inverted)}
              onMouseEnter={this.handlePopupMouseEnter}
              onMouseLeave={this.handlePopupMouseLeave}
            >
              <Text inverted={invert}>{content}</Text>
            </div>
          </div>
        </div>
      )
    );
  }
  render() {
    const { accessibilityLabel, cx, styles, children, content, disabled, underlined } = this.props;
    const { open, labelID } = this.state;
    return (
      <span ref={this.containerRef} className={cx(styles.container)}>
        <div
          aria-labelledby={accessibilityLabel ? undefined : labelID}
          aria-label={accessibilityLabel}
          className={cx(!disabled && underlined && styles.underlined)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
        >
          {children}
        </div>
        {/* render off-screen element in a separate layer */}
        {!accessibilityLabel && (
          <Portal>
            <div id={labelID} className={cx(styles.offscreen)}>
              {content}
            </div>
          </Portal>
        )}
        {open ? this.renderPopUp() : null}
      </span>
    );
  }
}
export default withStyles(styleSheetPopover, {
  passThemeProp: true,
})(Popover);
