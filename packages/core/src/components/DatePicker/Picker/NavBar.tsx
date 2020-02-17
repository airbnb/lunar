import React from 'react';
import { NavbarElementProps } from 'react-day-picker';
import IconArrowLeft from '@airbnb/lunar-icons/lib/interface/IconArrowLeft';
import IconArrowRight from '@airbnb/lunar-icons/lib/interface/IconArrowRight';
import datePickerStyles from '../../private/datePickerStyles';
import DirectionalIcon from '../../DirectionalIcon';
import IconButton from '../../IconButton';
import T from '../../Translate';
import useStyles, { StyleSheet } from '../../../hooks/useStyles';

export type NavBarProps = NavbarElementProps & {
  /** Callback for a reset button. */
  onResetClick?: () => void;
  /** Show the reset button. */
  showResetButton?: boolean;
  /** Whether there is a footer to account for positioning. */
  noFooter?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function NavBar({
  className,
  classNames,
  labels,
  noFooter,
  showNextButton,
  showPreviousButton,
  showResetButton,
  onNextClick,
  onPreviousClick,
  onResetClick,
  styleSheet,
}: NavBarProps) {
  const [styles, cx] = useStyles(styleSheet ?? datePickerStyles);

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePreviousClick = () => {
    onPreviousClick();
  };

  const handleResetClick = () => {
    if (onResetClick) {
      onResetClick();
    }
  };

  return (
    <div className={className}>
      {showPreviousButton && (
        <div className={classNames.navButtonPrev}>
          <IconButton tooltip={labels.previousMonth} onClick={handlePreviousClick}>
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
          <IconButton tooltip={labels.nextMonth} onClick={handleNextClick}>
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
          <button className={cx(styles.todayButton)} type="button" onClick={handleResetClick}>
            <T k="lunar.common.reset" phrase="Reset" />
          </button>
        </div>
      )}
    </div>
  );
}
