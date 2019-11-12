/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import uuid from 'uuid/v4';
import Overlay from '../Overlay';
import NotchedBox, { NOTCH_SIZE, NOTCH_SPACING } from '../NotchedBox';
import Text from '../Text';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { styleSheet } from './styles';

const EMPTY_TARGET_RECT: ClientRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
};

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
  open: boolean;
  tooltipHeight: number;
  targetRect: ClientRect;
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
    open: false,
    tooltipHeight: 0,
    targetRect: EMPTY_TARGET_RECT,
  };

  containerRef = React.createRef<HTMLSpanElement>();

  currentTooltipRef: HTMLDivElement | null = null;

  rafHandle?: number;

  static getDerivedStateFromProps({ disabled }: Props) {
    if (disabled) {
      return {
        open: false,
      };
    }

    return null;
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      targetRect: document.body.getBoundingClientRect(),
    });
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

  private handleEnter = () => {
    const { current } = this.containerRef;

    /* istanbul ignore if: refs are hard */
    if (current) {
      this.setState({ targetRect: current.getBoundingClientRect() });
    }

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
    const { open, targetRect, tooltipHeight, labelID } = this.state;
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

        <div id={labelID} className={cx(styles.offscreen)}>
          {content}
        </div>

        <Overlay noBackground open={open} onClose={this.handleClose}>
          <div
            ref={this.handleTooltipRef}
            role="tooltip"
            className={cx(styles.tooltip, above ? styles.tooltip_above : styles.tooltip_below, {
              width,
              marginLeft: marginLeft[align as keyof StyleStruct],
              marginTop: above ? -(tooltipHeight + targetRect.height + distance) : distance,
              textAlign: align,
            })}
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
        </Overlay>
      </span>
    );
  }
}

export default withStyles(styleSheet, {
  passThemeProp: true,
})(Tooltip);
