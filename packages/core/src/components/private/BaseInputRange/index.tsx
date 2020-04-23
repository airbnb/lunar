import React from 'react';
import memoize from 'lodash/memoize';

import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import Text from '../../Text';
import { stylesheetInputRange, HANDLE_SIZE, HALF_HANDLE_SIZE, MARK_SIZE } from './styles';

const getCorrectedPosition = memoize(
  (value: number, min: number, max: number, width: number) => {
    const valueRange = max - min;
    const centerX = width / 2;
    const pxPosition = ((value - min) / valueRange) * width;
    const pxFromCenter = ((value - min) / valueRange) * width - centerX;
    const pxOffset = (pxFromCenter / centerX) * HALF_HANDLE_SIZE;
    const leftPosition = pxPosition - pxOffset;
    return leftPosition;
  },
  (...args) => JSON.stringify(args),
);

export type BaseInputRangeProps = {
  /** Whether to always show a tooltip with value. */
  alwaysShowTooltip?: boolean;
  /** Any values to annotate. */
  annotations?: { value: number; label?: string }[];
  /** Whether to disable the input. */
  disabled?: boolean;
  /** Unique id of the input. */
  id: string;
  /** Max range value. */
  max?: number;
  /** Min range value. */
  min?: number;
  /** Callback invoked on input value change. */
  onChange: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Override rendering of tooltip content. */
  renderTooltipContent?: (value: number) => React.ReactNode;
  /** Whether to show a tooltip with value on hover. */
  showTooltip?: boolean;
  /** Step size for the range. */
  step?: number;
  /** Current value. */
  value: number;
  /** Width of the input. */
  width?: number;
};

type BaseInputRangeState = {
  showPopup: boolean;
};

class BaseInputRange extends React.Component<
  BaseInputRangeProps & WithStylesProps,
  BaseInputRangeState
> {
  static defaultProps = {
    renderTooltipContent: (value: number) => value.toFixed(0),
  };

  state = {
    showPopup: !!this.props.alwaysShowTooltip,
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(Number(event.currentTarget.value), event);
  };

  private handleMouseEnter = () => {
    if (this.props.showTooltip && !this.props.alwaysShowTooltip) {
      this.setState({ showPopup: true });
    }
  };

  private handleMouseLeave = () => {
    if (this.props.showTooltip && !this.props.alwaysShowTooltip) {
      this.setState({ showPopup: false });
    }
  };

  renderTooltip(leftOffset: number) {
    const { renderTooltipContent, value, cx, styles } = this.props;
    return (
      <div
        role="tooltip"
        className={cx(styles.tooltip, {
          marginLeft: leftOffset,
        })}
      >
        <div className={cx(styles.tooltipContent)}>
          <Text inverted>{renderTooltipContent!(value)}</Text>
        </div>
      </div>
    );
  }

  render() {
    const {
      annotations,
      disabled,
      max = 100,
      min = 0,
      step,
      value,
      width = 300,
      cx,
      styles,
      theme,
    } = this.props;
    const {
      accent: { borderActive },
      core: { neutral },
    } = theme!.color;
    const { showPopup } = this.state;
    const minPx = getCorrectedPosition(min, min, max, width);
    const maxPx = getCorrectedPosition(max, min, max, width);
    const handlePositionPx = getCorrectedPosition(value, min, max, width);

    return (
      <div
        className={cx(styles.container, { width })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <input
          disabled={disabled}
          className={cx(styles.input, {
            // fill from start to current value, with transparent edges
            background: `linear-gradient(to right, 
            transparent 0px,
            transparent ${minPx}px,
            ${borderActive} ${minPx}px, 
            ${borderActive} ${handlePositionPx}px, 
            ${neutral[2]} ${handlePositionPx}px, 
            ${neutral[2]} ${maxPx}px,
            transparent ${maxPx}px,
            transparent ${width}px)`,
          })}
          min={`${min}`}
          max={`${max}`}
          value={`${value}`}
          step={`${step}`}
          type="range"
          onChange={this.handleChange}
        />

        {/** Give illusion of border radius which is gone due to background gradient */}
        {[min, max].map((bound) => {
          const pxPosition = getCorrectedPosition(bound, min, max, width);
          const isOverlappingHandle = Math.abs(handlePositionPx - pxPosition) <= HANDLE_SIZE;

          return isOverlappingHandle ? null : (
            <div
              key={bound}
              className={cx(
                styles.annotation,
                styles.annotation_bounds,
                bound <= value && styles.annotation_bounds_active,
                {
                  left: pxPosition,
                  transform: `translateX(-${MARK_SIZE / 2}px)`,
                },
              )}
            />
          );
        })}

        {/** Annotations with optional labels */}
        {annotations?.map(({ value: annotationValue, label }) => {
          const pxPosition = getCorrectedPosition(annotationValue, min, max, width);
          const isOverlappingHandle = Math.abs(handlePositionPx - pxPosition) <= HANDLE_SIZE;

          return (
            <div
              key={annotationValue}
              className={cx(
                styles.annotation,
                annotationValue <= value && styles.annotation_active,
                isOverlappingHandle && styles.annotation_hidden,
                {
                  left: pxPosition,
                  transform: `translateX(-${MARK_SIZE / 2}px)`,
                },
              )}
            >
              {label && <div className={cx(styles.annotationLabel)}>{label}</div>}
            </div>
          );
        })}

        {showPopup && this.renderTooltip(handlePositionPx)}
      </div>
    );
  }
}

export default withStyles(stylesheetInputRange, { passThemeProp: true })(BaseInputRange);