/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { v4 as uuid } from 'uuid';
import Overlay from '../Overlay';
import Text from '../Text';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { styleSheetTooltip } from './styles';
import Portal from '../Portal';

const EMPTY_TARGET_RECT: ClientRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
};

export type TooltipProps = {
  /** Manually override calculated align */
  align?: 'center' | 'left' | 'right';
  /** Inline content to hover. */
  children: NonNullable<React.ReactNode>;
  /** What to show in the tooltip. */
  content: NonNullable<React.ReactNode>;
  /** True to disable tooltip but still show children. */
  disabled?: boolean;
  /** True to use a light background with dark text. */
  inverted?: boolean;
  /** Callback fired when the tooltip is shown. */
  onShow?: () => void;
  /** True to prevent dismissmal on mouse down. */
  remainOnMouseDown?: boolean;
  /** True to add a dotted bottom border. */
  underlined?: boolean;
  /** Width of the tooltip in units. */
  width?: number;
};

export type TooltipState = {
  labelID: string;
  open: boolean;
  tooltipHeight: number;
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

/** A tooltip that renders in an portal, so it can escape potentially overflowed containers. */
export class Tooltip extends React.Component<TooltipProps & WithStylesProps, TooltipState> {
  static inverted: boolean = false;

  static defaultProps = {
    disabled: false,
    inverted: false,
    onShow() {},
    remainOnMouseDown: false,
    underlined: false,
    width: 35,
  };

  state = {
    labelID: uuid(),
    open: false,
    tooltipHeight: 0,
    targetRect: EMPTY_TARGET_RECT,
    targetRectReady: false,
  };

  containerRef = React.createRef<HTMLSpanElement>();

  currentTooltipRef: HTMLDivElement | null = null;

  mounted: boolean = false;

  rafHandle: number = 0;

  static getDerivedStateFromProps({ disabled }: TooltipProps) {
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

  componentDidUpdate(prevProps: TooltipProps) {
    if (prevProps.content !== this.props.content) {
      this.updateTooltipHeight();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    cancelAnimationFrame(this.rafHandle);
  }

  updateTooltipHeight() {
    // we need to know the height of the tooltip to position it above target
    /* istanbul ignore next: refs are hard */
    this.rafHandle = requestAnimationFrame(() => {
      const el = this.currentTooltipRef;

      if (this.mounted) {
        this.setState({ tooltipHeight: el ? el.offsetHeight : 0 });
      }
    });
  }

  bestPosition(rect: TooltipState['targetRect']): PositionStruct {
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

  private handleTooltipRef = (ref: HTMLDivElement | null) => {
    this.currentTooltipRef = ref;
    this.updateTooltipHeight();
  };

  private handleEnter = () => {
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

  private handleMouseDown = () => {
    if (!this.props.remainOnMouseDown) {
      this.handleClose();
    }
  };

  private handleClose = () => {
    this.setState({ open: false });
  };

  private renderPopUp() {
    const { align: alignProp, cx, styles, theme, width: widthProp, content, inverted } = this.props;
    const { open, targetRect, tooltipHeight, targetRectReady } = this.state;

    // render null until targetRect is initialized by cDM
    if (!targetRectReady) {
      return null;
    }

    const { unit } = theme!;
    const width = widthProp! * unit;

    // bestPosition will cause a reflow as will `targetRect.width`
    const { align, above } = this.bestPosition(targetRect);
    const targetWidth = targetRect.width;
    const marginLeft: StyleStruct = {
      center: -width / 2 + targetWidth / 2,
      right: -width + targetWidth,
    };
    const distance = unit / 2;
    const invert = inverted || Tooltip.inverted;

    return (
      <Overlay noBackground open={open} onClose={this.handleClose}>
        <div
          ref={this.handleTooltipRef}
          role="tooltip"
          className={cx(styles.tooltip, above ? styles.tooltip_above : styles.tooltip_below, {
            width,
            marginLeft: marginLeft[(alignProp ?? align) as keyof StyleStruct],
            marginTop: above ? -(tooltipHeight + targetRect.height + distance) : distance,
            textAlign: alignProp ?? align,
          })}
        >
          <div className={cx(styles.content, invert && styles.content_inverted)}>
            <Text inverted={invert}>{content}</Text>
          </div>
        </div>
      </Overlay>
    );
  }

  render() {
    const { cx, styles, children, content, disabled, underlined } = this.props;
    const { open, labelID } = this.state;

    return (
      <span ref={this.containerRef} className={cx(styles.container)}>
        <div
          aria-labelledby={labelID}
          className={cx(!disabled && underlined && styles.underlined)}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleClose}
          onMouseDown={this.handleMouseDown}
        >
          {children}
        </div>

        {/* render off-screen element in a separate layer */}
        <Portal>
          <div id={labelID} className={cx(styles.offscreen)}>
            {content}
          </div>
        </Portal>

        {open ? this.renderPopUp() : null}
      </span>
    );
  }
}

export default withStyles(styleSheetTooltip, {
  passThemeProp: true,
})(Tooltip);
