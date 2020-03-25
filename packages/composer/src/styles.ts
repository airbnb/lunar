import { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import baseInputStyleSheet from '@airbnb/lunar/lib/themes/inputStyleSheet';

export const composerStyleSheet: StyleSheet = ({ ui, unit }) => ({
  composer: {
    position: 'relative',
  },

  field: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  affix: {
    flexGrow: 0,
    width: unit * 4,
    paddingBottom: unit / 2 + ui.borderWidth,
  },

  input: {
    flexGrow: 1,
  },

  footer_before: {
    paddingLeft: unit * 4,
  },

  footer_after: {
    paddingRight: unit * 4,
  },
});

export const iconButtonStyleSheet: StyleSheet = ({ color, pattern, unit }) => ({
  button: {
    ...pattern.resetButton,
    color: color.core.primary[3],
    padding: unit / 2,

    '@selectors': {
      '[disabled]': {
        color: color.core.neutral[4],
        cursor: 'not-allowed',
      },

      ':not([disabled]):hover': {
        color: color.core.primary[5],
      },
    },
  },
});

export const footerStyleSheet: StyleSheet = ({ color, font, unit }) => ({
  footer: {
    ...font.textSmall,
    textAlign: 'right',
    color: color.core.neutral[4],
    paddingTop: unit / 2,
    paddingBottom: unit / 2,
    lineHeight: 1,
  },
});

export const footerMarkStyleSheet: StyleSheet = ({ color, ui, unit }) => ({
  mark: {
    border: ui.border,
    borderColor: color.core.neutral[2],
    borderRadius: ui.borderRadius,
    background: color.core.neutral[0],
    color: color.core.neutral[4],
    paddingLeft: unit / 2,
    paddingRight: unit / 2,
    paddingBottom: 1,
    marginRight: unit / 2,
    display: 'inline-block',
  },
});

export const footerTipStyleSheet: StyleSheet = ({ unit }) => ({
  tip: {
    display: 'inline-block',
    marginLeft: unit,
    marginBottom: 2,
  },
});

export const inputStyleSheet: StyleSheet = (theme) => {
  const inputStyles = baseInputStyleSheet(theme);
  const { color, font, transition, ui, unit } = theme;

  return {
    container: {
      ...font.textRegular,
      ...transition.box,
      border: ui.borderThick,
      borderRadius: ui.borderRadius,
      color: color.accent.text,
      position: 'relative',

      ':hover': {
        borderColor: color.accent.borderHover,
      },

      '::placeholder': {
        color: color.muted,
      },
    },

    container_focused: inputStyles.input_focused,

    container_invalid: inputStyles.input_invalid,

    container_disabled: inputStyles.input_disabled,

    container_important: inputStyles.input_important,

    input: {
      ...transition.box,
      border: 0,
      background: 'transparent',
      color: 'inherit',
      display: 'block',
      resize: 'none',
      margin: 0,
      padding: unit,
      paddingRight: unit * 4.5, // Submit button
      width: '100%',

      // Keep font consistent between original and shadow
      letterSpacing: 'initial',
      '-webkit-text-size-adjust': 'none',

      '::placeholder': {
        color: 'inherit',
      },

      '::-ms-clear': {
        display: 'none',
      },
    },

    input_shadow: {
      color: color.core.neutral[3],
      position: 'absolute',
      top: 0,
      zIndex: 0,
    },

    input_original: {
      position: 'relative',
      zIndex: 1,
    },

    submitButton: {
      position: 'absolute',
      bottom: unit / 2 - ui.borderWidth,
      right: unit / 2,
      zIndex: 2,
    },
  };
};

export const menuStyleSheet: StyleSheet = ({ color, font, ui, unit }) => ({
  menu: {
    background: color.accent.bg,
    border: ui.border,
    borderRadius: ui.borderRadius,
    boxShadow: ui.boxShadowMedium,
    color: color.accent.text,
    padding: 0,
    margin: 0,
  },

  menu_borderless: {
    borderWidth: 0,
  },

  menu_centerAlign: {
    width: '100%',
  },

  menu_sideAlign: {
    width: 250,
  },

  title: {
    borderBottom: ui.border,
    padding: `${unit}px ${unit * 2}px`,
    fontWeight: font.weights.bold,
  },
});

export const previewWindowStyleSheet: StyleSheet = ({ unit }) => ({
  preview: {
    position: 'relative',
    padding: `${unit}px ${unit * 2}px`,
  },

  footer: {
    paddingRight: unit,
    paddingBottom: unit,
    paddingLeft: unit * 2,
  },
});

export const selectListStyleSheet: StyleSheet = ({ unit }) => ({
  list: {
    margin: 0,
    padding: 0,
    maxHeight: 200,
    listStyle: 'none',
    overflow: 'auto',
  },

  row: {
    padding: `${unit}px ${unit * 2}px`,
  },
});

export const selectListItemStyleSheet: StyleSheet = ({ color, font, pattern, unit }) => ({
  button: {
    ...pattern.resetButton,
    background: color.accent.bg,
    display: 'block',
    padding: `${unit}px ${unit * 2}px`,
    width: '100%',
    textAlign: 'left',

    ':hover': {
      background: color.accent.bgHover,
    },
  },

  button_active: {
    color: color.base,
    background: color.core.primary[3],

    ':hover': {
      background: color.core.primary[4],
    },
  },

  name: {
    fontWeight: font.weights.bold,
  },

  status: {
    fontWeight: 'normal',
    display: 'inline-block',
    marginLeft: unit / 2,
  },

  description: {
    opacity: 0.75,
  },
});
