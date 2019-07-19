import React from 'react';
import { NavbarElementProps as NavBarProps } from 'react-day-picker';
import IconArrowLeft from '@airbnb/lunar-icons/lib/interface/IconArrowLeft';
import IconArrowRight from '@airbnb/lunar-icons/lib/interface/IconArrowRight';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import datePickerStyles from '../../private/datePickerStyles';
import DirectionalIcon from '../../DirectionalIcon';
import IconButton from '../../IconButton';
import T from '../../Translate';

export type Props = NavBarProps & {
  /** Callback for a reset button. */
  onResetClick?: () => void;
  /** Show the reset button. */
  showResetButton?: boolean;
  /** Whether there is a footer to account for positioning. */
  noFooter?: boolean;
};

class NavBar extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    noFooter: false,
    showResetButton: false,
  };

  private handleNextClick = () => {
    this.props.onNextClick();
  };

  private handlePreviousClick = () => {
    this.props.onPreviousClick();
  };

  private handleResetClick = () => {
    if (this.props.onResetClick) {
      this.props.onResetClick();
    }
  };

  render() {
    const {
      cx,
      className,
      classNames,
      labels,
      noFooter,
      showNextButton,
      showPreviousButton,
      showResetButton,
      styles,
    } = this.props;

    return (
      <div className={className}>
        {showPreviousButton && (
          <div className={classNames.navButtonPrev}>
            <IconButton tooltip={labels.previousMonth} onClick={this.handlePreviousClick}>
              <DirectionalIcon
                direction="left"
                left={IconArrowLeft}
                right={IconArrowRight}
                size="1.25em"
                accessibilityLabel={labels.previousMonth}
              />
            </IconButton>
          </div>
        )}

        {showNextButton && (
          <div className={classNames.navButtonNext}>
            <IconButton tooltip={labels.nextMonth} onClick={this.handleNextClick}>
              <DirectionalIcon
                direction="right"
                left={IconArrowLeft}
                right={IconArrowRight}
                size="1.25em"
                accessibilityLabel={labels.nextMonth}
              />
            </IconButton>
          </div>
        )}

        {showResetButton && (
          <div className={cx(styles.resetButton, noFooter && styles.resetButton_noFooter)}>
            <button
              className={cx(styles.todayButton)}
              type="button"
              onClick={this.handleResetClick}
            >
              <T k="lunar.common.reset" phrase="Reset" context="Reset selected dates" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(datePickerStyles)(NavBar);
