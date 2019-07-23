/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import uuid from 'uuid/v4';
import Overlay from '../Overlay';
import NotchedBox, { NOTCH_SIZE, NOTCH_SPACING } from '../NotchedBox';
import Text from '../Text';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Width of the tooltip in units. */
  width?: number;
  /** What to show in the tooltip. */
  content: NonNullable<React.ReactNode>;
  /** Inline content to hover. */
  children: NonNullable<React.ReactNode>;
  /** True to disable tooltip but still show children. */
  disabled?: boolean;
  /** True to use a light background with dark text. */
  inverted?: boolean;
  /** True to prevent dismissmal on mouse down. */
  remainOnMouseDown?: boolean;
  /** True to add a dotted bottom border. */
  underlined?: boolean;
  /** Callback fired when the tooltip is shown. */
  onShow?: () => void;
};

export type State = {
  labelID: string;
  hoveringButton: boolean;
  hoveringTooltip: boolean;
  tooltipHeight: number;
  targetRect: ClientRect;
};

export type PositionStruct = {
  above: boolean;
  align: 'left' | 'center' | 'right';
};

export type StyleStruct = {
  center: any;
  right: any;
};

/** A tooltip that renders in an portal, so it can escape potentially overflowed containers. */
export class Tooltip extends React.Component<Props & WithStylesProps, State> {
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
    hoveringButton: false,
    hoveringTooltip: false,
    tooltipHeight: 0,
    targetRect: document.body.getBoundingClientRect(),
  };

  containerRef = React.createRef<HTMLSpanElement>();

  currentTooltipRef: HTMLDivElement | null = null;

  rafHandle?: number;

  static getDerivedStateFromProps({ disabled }: Props) {
    if (disabled) {
      return {
        hoveringButton: false,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.content !== this.props.content) {
      this.updateTooltipHeight();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafHandle as number);
  }

  updateTooltipHeight() {
    // we need to know the height of the tooltip to position it above target
    /* istanbul ignore next: refs are hard */
    this.rafHandle = requestAnimationFrame(() => {
      const el = this.currentTooltipRef;
      this.setState({ tooltipHeight: el ? el.offsetHeight : 0 });
    });
  }

  bestPosition(rect: State['targetRect']): PositionStruct {
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

  private handleEnter = (element: string) => () => {
    const { current } = this.containerRef;
    const { disabled, onShow } = this.props;
    const { hoveringTooltip, hoveringButton } = this.state;

    /* istanbul ignore if: refs are hard */
    if (current) {
      this.setState({ targetRect: current.getBoundingClientRect() });
    }

    const open = hoveringTooltip || hoveringButton;
    if (!disabled && !open) {
      this.setState({
        [`hovering${element}`]: true,
      });
      onShow!();
    }
  };

  private handleMouseDown = () => {
    if (!this.props.remainOnMouseDown) {
      this.handleClose();
    }
  };

  private handleClose = (element: string) => () => {
    this.setState({ [`hovering${element}`]: false });
  };

  render() {
    const {
      cx,
      styles,
      theme,
      width: widthProp,
      children,
      content,
      disabled,
      underlined,
      inverted,
    } = this.props;
    const { hoveringButton, hoveringTooltip, targetRect, tooltipHeight, labelID } = this.state;
    const { unit } = theme!;
    const width = widthProp! * unit;
    const { align, above } = this.bestPosition(targetRect);
    const targetWidth = targetRect.width;
    const halfNotch = (NOTCH_SIZE * unit) / Math.SQRT2;
    const notchOffset: StyleStruct = {
      center: '50%',
      right: -(unit * NOTCH_SPACING + halfNotch),
    };
    const marginLeft: StyleStruct = {
      center: -width / 2 + targetWidth / 2,
      right: -width + targetWidth,
    };
    const distance = halfNotch + 1;

    const open = hoveringButton || hoveringTooltip;

    return (
      <span
        className={cx(styles.container)}
        ref={this.containerRef}
        onMouseEnter={this.handleEnter('Button')}
        onMouseLeave={this.handleClose('Button')}
        onMouseDown={this.handleMouseDown}
      >
        <div aria-labelledby={labelID} className={cx(!disabled && underlined && styles.underlined)}>
          {children}
        </div>

        <div id={labelID} className={cx(styles.offscreen)}>
          {content}
        </div>

        {open && (
          <div
            role="tooltip"
            onMouseEnter={this.handleEnter('Tooltip')}
            onMouseLeave={this.handleClose('Tooltip')}
            className={cx(styles.tooltip, above ? styles.tooltip_above : styles.tooltip_below, {
              width,
              marginLeft: marginLeft[align as keyof StyleStruct],
              marginTop: above ? -(tooltipHeight + targetRect.height + distance) : distance,
              textAlign: align,
            })}
            ref={this.handleTooltipRef}
          >
            <div className={cx(styles.shadow)}>
              <NotchedBox
                inverted={!inverted}
                notchOffset={notchOffset[align as keyof StyleStruct]}
                notchBelow={above}
              >
                <Text inverted={!inverted}>{content}</Text>
              </NotchedBox>
            </div>
          </div>
        )}
      </span>
    );
  }
}

export default withStyles(
  ({ unit, color, pattern, ui }) => ({
    container: {
      display: 'inline-block',
    },

    offscreen: {
      ...pattern.offscreen,
    },

    underlined: {
      borderBottom: `1px dotted ${color.core.primary[3]}`,
      cursor: 'help',
    },

    tooltip: {
      animationDuration: '200ms',
      animationTimingFunction: 'ease-out',
      border: `${1.5 * unit}px solid transparent`,
      position: 'absolute',
    },

    tooltip_above: {
      transform: `translateY(${unit * 1.5}px)`,
      animationName: {
        name: 'fadeDown',
        from: {
          opacity: 0,
          transform: `translateY(${unit * 3}px)`,
        },
        to: {
          opacity: 1,
        },
      },
    },

    tooltip_below: {
      transform: `translateY(-${unit * 1.5}px)`,
      animationName: {
        name: 'fadeUp',
        from: {
          opacity: 0,
          transform: `translateY(-${unit * 3}px)`,
        },
        to: {
          opacity: 1,
        },
      },
    },

    shadow: {
      display: 'inline-block',
      boxShadow: ui.boxShadowLarge,
      borderRadius: ui.borderRadius,
    },
  }),
  {
    passThemeProp: true,
  },
)(Tooltip);
