import { SKIN_COLORS } from 'interweave-emoji-picker';
import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ ui, unit, color, font, pattern }) => ({
  picker: {
    background: color.accent.bg,
    border: ui.border,
    borderRadius: ui.borderRadius,
  },

  preview: {
    ...font.textRegular,
    padding: unit * 1.5,
    borderBottom: ui.border,
    display: 'flex',
    alignItems: 'center',

    ':empty': {
      display: 'none',
    },
  },

  previewEmoji: {
    flexGrow: 0,
    marginRight: unit * 2,
  },

  previewTitle: {
    ...font.textRegular,
    marginBottom: unit / 2,
  },

  previewSubtitle: {
    ...font.textSmall,
    fontWeight: font.weights.light,
    color: color.muted,
  },

  previewShiftMore: {
    fontWeight: font.weights.light,
    color: color.muted,
    marginLeft: unit,
  },

  emoji: {
    background: 'transparent',
    border: 0,
    fontSize: 'inherit',
    float: 'left',
    cursor: 'pointer',

    ':focus': {
      outline: 'none',
    },

    '@selectors': {
      ':not(:empty) > img': {
        display: 'block',
      },
    },
  },

  emoji_active: {
    background: color.accent.bgHover,
    borderRadius: ui.borderRadius,
  },

  emojis: {
    position: 'relative',
    padding: unit,
  },

  emojisHeader: {
    ...font.textMicro,
    fontWeight: font.weights.bold,
    textTransform: 'uppercase',
    color: color.accent.text,
    background: color.accent.bg,
    padding: `${unit}px 0`,
    lineHeight: 1,
  },

  emojisHeader_sticky: {
    position: 'absolute',
    top: unit,
    left: unit,
    right: unit,
    zIndex: 2,
  },

  list: {
    display: 'flex',
    flexWrap: 'nowrap',
    margin: 0,
    padding: 0,
    lineHeight: 1,
    listStyle: 'none',
    justifyContent: 'space-between',
  },

  group: {
    background: 'transparent',
    border: '1px solid transparent',
    borderTop: 0,
    padding: `${unit}px ${unit * 0.75}px`,
    fontSize: 16,
    position: 'relative',
    cursor: 'pointer',
    color: color.accent.text,
    borderBottomLeftRadius: ui.borderRadius,
    borderBottomRightRadius: ui.borderRadius,

    ':hover': {
      background: color.core.neutral[2],
    },

    ':focus': {
      outline: 'none',
    },
  },

  group_active: {
    background: color.accent.bg,
    color: color.core.primary[3],

    ':hover': {
      background: color.accent.bgHover,
    },
  },

  groups: {
    background: color.core.neutral[3],
    padding: `0 ${unit}px ${unit / 2}px ${unit}px`,
  },

  skinTone: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: '50%',
    width: 12,
    height: 12,
    padding: 0,
    margin: 0,
    marginLeft: unit / 2,
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'block',
    opacity: 0.75,

    '@selectors': {
      ':hover': {
        opacity: 1,
      },

      ':focus': {
        outline: 'none',
      },

      ...Object.keys(SKIN_COLORS).reduce(
        (colors, key) => ({
          ...colors,
          [`[data-skin-tone="${key}"]`]: {
            backgroundColor: SKIN_COLORS[key],
            borderColor: SKIN_COLORS[key],
          },
        }),
        {},
      ),
    },
  },

  skinTone_active: {
    opacity: 1,

    '@selectors': {
      ...Object.keys(SKIN_COLORS).reduce(
        (colors, key) => ({
          ...colors,
          [`[data-skin-tone="${key}"]`]: {
            backgroundColor: color.accent.bg,
          },
        }),
        {},
      ),
    },
  },

  skinTones: {
    float: 'right',
    textAlign: 'center',
  },

  search: {
    padding: unit,
    paddingTop: 0,
  },

  searchInput: {
    ...font.textSmall,
    fontWeight: font.weights.light,
    border: ui.borderThick,
    borderRadius: ui.borderRadius,
    backgroundColor: color.accent.bg,
    padding: unit,
    zIndex: 0,
    width: '100%',

    ':focus': {
      ...pattern.focused,
    },
  },

  noPreview: {
    ...font.textRegular,
    color: color.muted,
  },

  noResults: {
    ...font.textRegular,
    padding: unit * 1.5,
  },

  clear: {
    ...pattern.resetButton,
    float: 'right',
    color: color.accent.text,
    margin: '0 -1px 0 0',

    ':hover': {
      color: color.core.neutral[4],
    },
  },
});

export default styleSheet;

export { styleSheet };
