import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetStatusLabel: StyleSheet = ({ color, font, ui, unit }) => ({
  label: {
    ...font.textMicro,
    display: 'inline-block',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    marginRight: unit / 2,
    paddingLeft: unit,
    paddingRight: unit,
    paddingTop: unit / 2,
    paddingBottom: unit / 2,
    borderRadius: ui.borderRadius,
    backgroundColor: color.core.neutral[1],
    color: color.accent.text,
    fontWeight: font.weights.bold,
    border: ui.border,
    borderColor: 'transparent',
  },

  label_uppercased: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  label_bordered: {
    borderColor: color.accent.border,
  },

  label_compact: {
    paddingLeft: 0.75 * unit,
    paddingRight: 0.75 * unit,
    paddingTop: unit / 4,
    paddingBottom: unit / 4,
  },

  label_inverted: {
    backgroundColor: color.clear,
    color: color.accent.text,
  },

  label_danger: {
    backgroundColor: color.core.danger[1],
  },

  label_inverted_danger: {
    color: color.core.danger[3],
  },

  label_info: {
    backgroundColor: color.core.primary[1],
  },

  label_inverted_info: {
    color: color.core.primary[3],
  },

  label_luxury: {
    backgroundColor: color.brand.luxury[3],
    color: color.base,
  },

  label_inverted_luxury: {
    color: color.brand.luxury[3],
  },

  label_muted: {
    backgroundColor: color.core.neutral[2],
  },

  label_inverted_muted: {
    color: color.core.neutral[3],
  },

  label_notice: {
    backgroundColor: color.core.secondary[1],
  },

  label_inverted_notice: {
    color: color.core.secondary[3],
  },

  label_plus: {
    backgroundColor: color.brand.plus[3],
    color: color.base,
  },

  label_inverted_plus: {
    color: color.brand.plus[3],
  },

  label_success: {
    backgroundColor: color.core.success[1],
  },

  label_inverted_success: {
    color: color.core.success[3],
  },

  label_warning: {
    backgroundColor: color.core.warning[1],
  },

  label_inverted_warning: {
    color: color.core.warning[6],
  },
});
