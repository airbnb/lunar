import { DayPickerProps } from 'react-day-picker';
import { WithStylesProps } from '../composers/withStyles';
import { Props } from '../components/DatePicker';

export function getCustomModifiers(
  modifiers: DayPickerProps['modifiers'],
  styles: WithStylesProps['styles'],
) {
  const customModifiers = modifiers || {};
  if (customModifiers.start && customModifiers.end) {
    if (String(customModifiers.start) !== String(customModifiers.end)) {
      customModifiers[cx(styles.modifier_start, styles.modifier_startWithRange).className] =
        customModifiers.start;
      customModifiers[cx(styles.modifier_end).className] = customModifiers.end;
    }
  } else if (customModifiers.start && !customModifiers.end) {
    customModifiers[cx(styles.modifier_start).className] = customModifiers.start;
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
    interactionDisabled: cx(styles.interactionDisabled).className,
    wrapper: cx(styles.wrapper).className,
    months: cx(styles.months, showResetButton && !todayButton && styles.months_withResetButton)
      .className,
    month: cx(styles.month).className,
    navBar: cx(styles.navBar).className,
    navButtonPrev: cx(styles.navButtonPrev).className,
    navButtonNext: cx(styles.navButtonNext).className,
    navButtonInteractionDisabled: cx(styles.navButtonInteractionDisabled).className,
    caption: cx(styles.caption).className,
    weekdays: cx(styles.weekdays).className,
    weekdaysRow: cx(styles.weekdaysRow).className,
    weekday: cx(styles.weekday).className,
    body: cx(styles.body).className,
    week: cx(styles.week).className,
    day: cx(styles.day).className,
    footer: cx(styles.footer, showResetButton && styles.footer_withResetButton).className,
    todayButton: cx(styles.todayButton, showResetButton && styles.todayButton_withResetButton)
      .className,
    today: cx(styles.modifier_today).className,
    selected: cx(styles.modifier_selected).className,
    disabled: cx(styles.modifier_disabled).className,
    outside: cx(styles.modifier_outside).className,

    // No styles yet
    weekNumber: '',
    overlay: '',
    overlayWrapper: '',
    container: '',
  };

  if (type === 'input') {
    return {
      ...baseClassNames,
      overlayWrapper: cx(styles.overlayWrapper).className,
      overlay: cx(styles.overlay).className,
      container: cx(styles.inputContainer).className,
    };
  }

  // type === 'calendar'
  return {
    ...baseClassNames,
    container: cx(styles.calendarContainer).className,
  };
}
