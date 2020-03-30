import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetChip: StyleSheet = ({ color, font, pattern, transition, ui, unit }) => ({
  chip: {
    ...transition.box,
    ...font.textSmall,
    backgroundColor: color.accent.bg,
    border: ui.border,
    borderRadius: ui.borderRadiusRounded,
    display: 'inline-block',
    height: unit * 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },

  chip_noBefore: {
    paddingLeft: unit,
  },

  chip_noAfter: {
    paddingRight: unit,
  },

  chip_active: {
    background: color.core.primary[3],
    borderColor: color.core.primary[3],
    color: color.accent.bg,
  },

  chip_active_button: {
    '@selectors': {
      ':not([disabled]):hover, :not([disabled]):focus': {
        backgroundColor: color.core.primary[4],
      },
    },
  },

  chip_compact: {
    borderRadius: 2,
    padding: `0 ${unit}`,
    height: 3 * unit,
  },

  chip_disabled: {
    backgroundColor: color.core.neutral[1],
    cursor: 'normal',
    borderColor: color.core.neutral[1],
  },

  chip_button: {
    cursor: 'pointer',
    padding: 0,

    '@selectors': {
      ':not([disabled]):active': {
        boxShadow: ui.boxShadow,
      },

      ':not([disabled]):hover, :not([disabled]):focus': {
        backgroundColor: color.accent.bgHover,
      },
    },
  },

  chipItem: {
    height: '100%',
    verticalAlign: 'middle',
  },

  content: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    marginLeft: unit,
    marginRight: unit,
  },

  iconWrapper: {
    color: color.core.neutral[3],
  },

  iconWrapperAfter: {
    padding: `${unit * 0.5}px ${unit * 0.5}px ${unit * 0.5}px 0`,
  },

  iconWrapperBefore: {
    padding: `${unit * 0.5}px ${unit * 0.5}px ${unit * 0.5}px ${unit}px`,
  },

  iconButton: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.neutral[6],

    ':focus': {
      color: color.core.primary[3],
      outline: 'none',
    },

    ':hover': {
      color: color.core.primary[3],
    },
  },

  iconButton_disabled: {
    ...pattern.disabled,

    ':hover': {
      color: color.core.neutral[6],
    },
  },

  sideContent: {
    display: 'inline-block',
  },

  sideContentInner: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',

    '@selectors': {
      '> button': {
        boxShadow: 'none',
      },
    },
  },
});
