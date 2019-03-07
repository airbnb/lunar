import { DayPickerProps } from 'react-day-picker';
import { css, WithStylesProps } from '../composers/withStyles';
import { Props } from '../components/DatePicker';

export function getCustomModifiers(
  modifiers: DayPickerProps['modifiers'],
  styles: WithStylesProps['styles'],
) {
  const customModifiers = modifiers || {};
  if (customModifiers.start && customModifiers.end) {
    if (String(customModifiers.start) !== String(customModifiers.end)) {
      customModifiers[css(styles.modifier_start, styles.modifier_startWithRange).className] =
        customModifiers.start;
      customModifiers[css(styles.modifier_end).className] = customModifiers.end;
    }
  } else if (customModifiers.start && !customModifiers.end) {
    customModifiers[css(styles.modifier_start).className] = customModifiers.start;
  }

  return customModifiers;
}

export function getClassNames(
  type: 'input' | 'calendar',
  styles: WithStylesProps['styles'],
  props: Props,
) {
  const { showResetButton, todayButton } = props;
  const baseClassNames = {
    interactionDisabled: css(styles.interactionDisabled).className,
    wrapper: css(styles.wrapper).className,
    months: css(styles.months, showResetButton && !todayButton && styles.months_withResetButton)
      .className,
    month: css(styles.month).className,
    navBar: css(styles.navBar).className,
    navButtonPrev: css(styles.navButtonPrev).className,
    navButtonNext: css(styles.navButtonNext).className,
    navButtonInteractionDisabled: css(styles.navButtonInteractionDisabled).className,
    caption: css(styles.caption).className,
    weekdays: css(styles.weekdays).className,
    weekdaysRow: css(styles.weekdaysRow).className,
    weekday: css(styles.weekday).className,
    body: css(styles.body).className,
    week: css(styles.week).className,
    day: css(styles.day).className,
    footer: css(styles.footer, showResetButton && styles.footer_withResetButton).className,
    todayButton: css(styles.todayButton, showResetButton && styles.todayButton_withResetButton)
      .className,
    today: css(styles.modifier_today).className,
    selected: css(styles.modifier_selected).className,
    disabled: css(styles.modifier_disabled).className,
    outside: css(styles.modifier_outside).className,

    // No styles yet
    weekNumber: '',
    overlay: '',
    overlayWrapper: '',
    container: '',
  };

  if (type === 'input') {
    return {
      ...baseClassNames,
      overlayWrapper: css(styles.overlayWrapper).className,
      overlay: css(styles.overlay).className,
      container: css(styles.inputContainer).className,
    };
  }

  // type === 'calendar'
  return {
    ...baseClassNames,
    container: css(styles.calendarContainer).className,
  };
}
