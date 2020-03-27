import { StyleBlock, StyleSheet } from 'aesthetic';
import { Theme } from '../../types';
import { Z_INDEX_MODAL } from '../../constants';

export default function datePickerStyles({
  color,
  font,
  pattern,
  transition,
  ui,
  unit,
}: Theme): StyleSheet {
  const commonNav: StyleBlock = {
    position: 'absolute',
    top: unit,
  };

  const commonCell: StyleBlock = {
    position: 'relative',
    padding: unit,
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: unit * 5,
    height: unit * 5,
    minWidth: unit * 5,
    minHeight: unit * 5,
    zIndex: 1,
  };

  const commonPseudoContent: StyleBlock = {
    content: '" "',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  };

  return {
    // The calendar container element
    calendarContainer: {
      ...font.textRegular,
      display: 'inline-block',
      background: color.accent.bg,
      border: ui.border,
      borderRadius: ui.borderRadius,
      boxShadow: ui.boxShadowMedium,
      padding: unit * 2,
    },

    // The input container element
    inputContainer: {
      ...font.textRegular,
      display: 'block',
      position: 'relative',
    },

    // The overlay's wrapper
    overlayWrapper: {
      background: color.accent.bg,
      position: 'absolute',
      margin: `${unit}px 0`,
      zIndex: Z_INDEX_MODAL,
    },

    // The overlay's container
    overlay: {},

    // The wrapper element, used for keyboard interaction
    wrapper: {
      position: 'relative',
      userSelect: 'none',
      flexDirection: 'row',
      outline: 'none',
    },

    // Added to the container when there's no interaction with the calendar
    interactionDisabled: {
      cursor: 'default',
    },

    // The navigation bar with the arrows to switch between months
    navBar: {},

    // Button to switch to the previous month
    navButtonPrev: {
      ...commonNav,
      left: 0,
    },

    // Button to switch to the next month
    navButtonNext: {
      ...commonNav,
      right: 0,
    },

    // Added to the navbuttons when disabled with fromMonth/toMonth props
    navButtonInteractionDisabled: {
      display: 'none',
    },

    // Container of the months table
    months: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',

      '@selectors': {
        '> div + div': {
          marginLeft: unit * 2,
        },
      },
    },

    months_withResetButton: {
      borderBottom: ui.border,
      marginBottom: unit * 5.75,
      paddingBottom: unit * 3,
    },

    // The month's main table
    month: {
      display: 'table',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      userSelect: 'none',
    },

    // The caption element, containing the current month's name and year
    caption: {
      ...font.textLarge,
      padding: unit,
      display: 'table-caption',
      textAlign: 'center',
      fontWeight: font.weights.bold,
    },

    // Table header displaying the weekdays names
    weekdays: {
      display: 'table-header-group',
    },

    // Table row displaying the weekdays names
    weekdaysRow: {
      display: 'table-row',
    },

    // Cell displaying the weekday name
    weekday: {
      ...commonCell,
      cursor: 'default',

      '@selectors': {
        '> abbr': {
          color: color.core.neutral[4],
          textDecoration: 'none',
        },
      },
    },

    // Table's body with the weeks
    body: {
      display: 'table-row-group',
    },

    // Table's row for each week
    week: {
      display: 'table-row',
    },

    // The single day cell
    day: {
      ...commonCell,
      cursor: 'pointer',
      transition: `background ${ui.transitionTime}`,

      '@selectors': {
        ':hover, :focus': {
          background: color.core.neutral[2],
          outline: 'none',
        },
      },
    },

    // The calendar footer (only with todayButton prop)
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: ui.border,
      padding: `${unit / 2}px 0 0`,
      margin: `${unit * 3}px 0 ${-unit / 2}px`,
    },

    footer_withResetButton: {
      justifyContent: 'flex-end',
    },

    resetButton: {
      position: 'absolute',
      bottom: 0,
      left: -unit * 2,
    },

    resetButton_noFooter: {
      bottom: -unit * 6.25,
      left: '50%',
      transform: 'translateX(-50%)',
    },

    // The today button (only with todayButton prop)
    todayButton: {
      ...pattern.resetButton,
      ...pattern.regularButton,
      ...transition.box,
      fontWeight: font.weights.bold,
      border: `${ui.borderWidthThick}px solid transparent`,
      borderRadius: ui.borderRadius,
      color: color.core.primary[3],
      cursor: 'pointer',
      position: 'relative',

      ':hover': {
        color: color.core.primary[4],
      },

      ':focus': {
        backgroundColor: color.accent.bgHover,
      },
    },

    todayButton_withResetButton: {
      right: -unit * 2,
    },

    /* default modifiers */
    // Added to the day's cell for the current day
    modifier_today: {
      fontWeight: font.weights.bold,
    },

    // Added to the day's cell specified in the "selectedDays" prop
    modifier_selected: {
      background: color.core.primary[1],

      '@selectors': {
        ':hover, :focus': {
          background: color.core.primary[4],
          color: color.base,
        },
      },
    },

    // Added to the day's cell specified in the "disabledDays" prop
    modifier_disabled: {
      ...pattern.disabled,
      cursor: 'default',
      pointerEvents: 'none',
    },

    // Added to the day's cell outside the current month
    modifier_outside: {
      opacity: 0,
      cursor: 'default',
      pointerEvents: 'none',
      zIndex: -1,
    },

    // Custom start selected styles
    modifier_start: {
      background: color.accent.bg,
      color: color.base,
      transition: 'none',

      ':before': {
        ...commonPseudoContent,
        left: '50%',
      },

      ':after': {
        ...commonPseudoContent,
        background: color.core.primary[3],
        border: '1px solid white',
        borderRadius: unit * 5,
      },

      '@selectors': {
        ':hover:after, :focus:after': {
          background: color.core.primary[4],
        },

        ':hover, :focus': {
          background: color.accent.bg,
        },
      },
    },

    modifier_startWithRange: {
      background: color.accent.bg,
      transition: 'none',

      ':before': {
        background: color.core.primary[1],
        left: '50%',
      },
    },

    // Custom end selected styles
    modifier_end: {
      background: color.accent.bg,
      color: color.base,
      transition: 'none',

      ':before': {
        ...commonPseudoContent,
        background: color.core.primary[1],
        right: '50%',
      },

      ':after': {
        ...commonPseudoContent,
        background: color.core.primary[3],
        border: `1px solid ${color.core.primary[3]}`,
        borderRadius: unit * 5,
      },

      '@selectors': {
        ':hover:after, :focus:after': {
          background: color.core.primary[4],
          borderColor: color.core.primary[4],
        },

        ':hover, :focus': {
          background: color.accent.bg,
        },
      },
    },
  };
}
