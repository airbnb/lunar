import { DayPickerProps } from 'react-day-picker';
import { WithStylesProps } from '../composers/withStyles';
import { DatePickerProps } from '../components/DatePicker';

export function getCustomModifiers(
  modifiers: DayPickerProps['modifiers'],
  styles: WithStylesProps['styles'],
  cx: WithStylesProps['cx'],
) {
  const customModifiers = modifiers || {};
  if (customModifiers.start && customModifiers.end) {
    if (String(customModifiers.start) !== String(customModifiers.end)) {
      customModifiers[cx(styles.modifier_start, styles.modifier_startWithRange)] =
        customModifiers.start;
      customModifiers[cx(styles.modifier_end)] = customModifiers.end;
    }
  } else if (customModifiers.start && !customModifiers.end) {
    customModifiers[cx(styles.modifier_start)] = customModifiers.start;
  }

  return customModifiers;
}

export function getClassNames(
  type: 'input' | 'calendar',
  styles: WithStylesProps['styles'],
  props: DatePickerProps & WithStylesProps,
) {
  const { cx, showResetButton, todayButton } = props;
  const baseClassNames = {
    interactionDisabled: cx(styles.interactionDisabled),
    wrapper: cx(styles.wrapper),
    months: cx(styles.months, showResetButton && !todayButton && styles.months_withResetButton),
    month: cx(styles.month),
    navBar: cx(styles.navBar),
    navButtonPrev: cx(styles.navButtonPrev),
    navButtonNext: cx(styles.navButtonNext),
    navButtonInteractionDisabled: cx(styles.navButtonInteractionDisabled),
    caption: cx(styles.caption),
    weekdays: cx(styles.weekdays),
    weekdaysRow: cx(styles.weekdaysRow),
    weekday: cx(styles.weekday),
    body: cx(styles.body),
    week: cx(styles.week),
    day: cx(styles.day),
    footer: cx(styles.footer, showResetButton && styles.footer_withResetButton),
    todayButton: cx(styles.todayButton, showResetButton && styles.todayButton_withResetButton),
    today: cx(styles.modifier_today),
    selected: cx(styles.modifier_selected),
    disabled: cx(styles.modifier_disabled),
    outside: cx(styles.modifier_outside),

    // No styles yet
    weekNumber: '',
    overlay: '',
    overlayWrapper: '',
    container: '',
  };

  if (type === 'input') {
    return {
      ...baseClassNames,
      overlayWrapper: cx(styles.overlayWrapper),
      overlay: cx(styles.overlay),
      container: cx(styles.inputContainer),
    };
  }

  // type === 'calendar'
  return {
    ...baseClassNames,
    container: cx(styles.calendarContainer),
  };
}
