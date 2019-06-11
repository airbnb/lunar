import { SheetMap } from 'aesthetic';
import { DayPickerProps } from 'react-day-picker';
import { getClassNames, getCustomModifiers } from '../../src/utils/datePicker';

const STYLE: SheetMap<any> = {
  body: { opacity: 0 },
  calendarContainer: { opacity: 0.1 },
  caption: { opacity: 0.2 },
  day: { opacity: 0.3 },
  footer_withResetButton: { opacity: 0.4 },
  footer: { opacity: 0.5 },
  inputContainer: { opacity: 0.6 },
  interactionDisabled: { opacity: 0.7 },
  modifier_disabled: { opacity: 0.8 },
  modifier_end: { opacity: 0.9 },
  modifier_outside: { opacity: 0.1 },
  modifier_selected: { opacity: 0.11 },
  modifier_start: { opacity: 0.12 },
  modifier_startWithRange: { opacity: 0.13 },
  modifier_today: { opacity: 0.14 },
  month: { opacity: 0.15 },
  months_withResetButton: { opacity: 0.16 },
  months: { opacity: 0.17 },
  navBar: { opacity: 0.18 },
  navButtonInteractionDisabled: { opacity: 0.19 },
  navButtonNext: { opacity: 0.2 },
  navButtonPrev: { opacity: 0.21 },
  overlay: { opacity: 0.22 },
  overlayWrapper: { opacity: 0.23 },
  resetButton_noFooter: { opacity: 0.24 },
  resetButton: { opacity: 0.25 },
  todayButton_withResetButton: { opacity: 0.26 },
  todayButton: { opacity: 0.27 },
  week: { opacity: 0.28 },
  weekday: { opacity: 0.29 },
  weekdays: { opacity: 0.3 },
  weekdaysRow: { opacity: 0.31 },
  wrapper: { opacity: 0.32 },
};

function cx(...styles: any[]): string {
  return styles
    .filter(Boolean)
    .map(style => JSON.stringify(style))
    .join('-');
}

describe('getClassNames()', () => {
  let mockStyles: SheetMap<any>;

  beforeEach(() => {
    mockStyles = { ...STYLE };
  });

  afterEach(() => {
    mockStyles = {};
  });

  it('returns different container class names by type', () => {
    const inputClassNames = getClassNames('input', mockStyles, { cx, styles: mockStyles });
    const calendarClassNames = getClassNames('calendar', mockStyles, { cx, styles: mockStyles });

    expect(inputClassNames.container !== calendarClassNames.container).toBe(true);
  });

  it('returns different class names if `showResetButton` is provided', () => {
    const defaultClassNames = getClassNames('input', mockStyles, { cx, styles: mockStyles });
    const showResetButtonClassNames = getClassNames('calendar', mockStyles, {
      cx,
      styles: mockStyles,
      showResetButton: true,
    });

    expect(defaultClassNames.footer !== showResetButtonClassNames.footer).toBe(true);
    expect(defaultClassNames.months !== showResetButtonClassNames.months).toBe(true);
    expect(defaultClassNames.todayButton !== showResetButtonClassNames.todayButton).toBe(true);
  });

  it('returns `overlayWrapper` and `overlay` class names for type `input`', () => {
    const inputClassNames = getClassNames('input', mockStyles, { cx, styles: mockStyles });
    const calendarClassNames = getClassNames('calendar', mockStyles, { cx, styles: mockStyles });

    expect(inputClassNames.overlayWrapper).not.toBe('');
    expect(inputClassNames.overlay).not.toBe('');
    expect(calendarClassNames.overlayWrapper).toBe('');
    expect(calendarClassNames.overlay).toBe('');
  });
});

describe('getCustomModifiers()', () => {
  let mockStyles: SheetMap<any>;

  beforeEach(() => {
    mockStyles = { ...STYLE };
  });

  afterEach(() => {
    mockStyles = {};
  });

  it('handles `start` modifier', () => {
    const modifiers: DayPickerProps['modifiers'] = {
      start: new Date(Date.UTC(2000, 1, 1)),
    };

    const startStylesClassName = cx(mockStyles.modifier_start);
    const customModifiers = getCustomModifiers(modifiers, mockStyles, cx);

    expect('start' in customModifiers).toBe(true);
    expect('end' in customModifiers).toBe(false);
    expect(startStylesClassName in customModifiers).toBe(true);
  });

  it('handles `start` and `end` modifiers', () => {
    const modifiers: DayPickerProps['modifiers'] = {
      start: new Date(Date.UTC(2000, 1, 1)),
      end: new Date(),
    };

    const startWithRangeStylesClassName = cx(
      mockStyles.modifier_start,
      mockStyles.modifier_startWithRange,
    );
    const endStylesClassName = cx(mockStyles.modifier_end);
    const customModifiers = getCustomModifiers(modifiers, mockStyles, cx);

    expect('start' in customModifiers).toBe(true);
    expect('end' in customModifiers).toBe(true);
    expect(startWithRangeStylesClassName in customModifiers).toBe(true);
    expect(endStylesClassName in customModifiers).toBe(true);
  });

  it('does not add end styles if no `start` modifier is provided', () => {
    const modifiers: DayPickerProps['modifiers'] = {
      end: new Date(),
    };

    const endStylesClassName = cx(mockStyles.modifier_end);
    const customModifiers = getCustomModifiers(modifiers, mockStyles, cx);

    expect('end' in customModifiers).toBe(true);
    expect(endStylesClassName in customModifiers).toBe(false);
  });
});
