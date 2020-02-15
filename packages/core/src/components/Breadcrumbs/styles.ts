import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetBreadcrumbs = {};

export const styleSheetBreadcrumb: StyleSheet = ({ color, font, pattern, transition, unit }) => ({
  breadcrumb: {
    ...pattern.resetButton,
    ...font.textRegular,
    ...transition.box,
    color: color.core.neutral[5],
    cursor: 'default',
    outline: 'none',
  },

  breadcrumb_clickable: {
    cursor: 'pointer',

    '@selectors': {
      ':not([disabled]):hover, :not([disabled]):focus': {
        color: color.core.neutral[4],
      },
    },
  },

  breadcrumb_disabled: {
    ...pattern.disabled,
  },

  breadcrumb_highlighted: {
    color: color.core.primary[3],
  },

  breadcrumb_highlighted_clickable: {
    '@selectors': {
      ':not([disabled]):hover, :not([disabled]):focus': {
        color: color.core.primary[4],
      },
    },
  },

  breadcrumb_selected: {
    fontWeight: font.weights.bold,
  },

  li: {
    marginRight: unit,

    ':last-child': {
      marginRight: 0,
    },
  },
});
