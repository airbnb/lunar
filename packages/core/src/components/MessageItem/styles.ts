import { StyleSheet } from '../../hooks/useStyles';
import toRGBA from '../../utils/toRGBA';

export const styleSheetMessageItem: StyleSheet = ({ color, font, ui, unit, pattern }) => ({
  relative: {
    position: 'relative',
  },

  container: {
    position: 'relative',
    border: '1px solid transparent',
    borderRadius: ui.borderRadius,
    margin: 0,
    padding: 0,
  },

  container_horizontalSpacing: {
    paddingLeft: unit * 2,
    paddingRight: unit * 2,
  },

  container_verticalSpacing: {
    marginBottom: unit * 2,
    marginTop: unit * 2,
  },

  container_withStripe: {
    borderColor: color.accent.border,
    borderWidth: `1px 1px 1px ${unit * 0.5}px`,
    padding: `${unit * 2}px ${unit * 2}px ${unit * 2}px ${unit * 1.5 + 1}px`,
  },

  container_important: {
    backgroundColor: color.core.danger[0],
    borderLeftColor: color.core.danger[3],
  },

  container_info: {
    backgroundColor: color.accent.bg,
    borderLeftColor: color.core.primary[3],
  },

  container_warning: {
    backgroundColor: color.core.warning[0],
    borderLeftColor: color.core.warning[3],
  },

  grid: {
    display: 'grid',
    gridGap: unit,
    gridTemplateColumns: `${unit * 4}px 1fr`,
    width: '100%',
  },

  profileBadge: {
    position: 'absolute',
    transform: `translate(50%, ${-unit}px)`,
  },

  wordBreak: {
    wordBreak: 'break-word',
  },

  resetButton: {
    ...pattern.resetButton,
    display: 'block',
    width: '100%',
    textAlign: 'left',

    ':focus': {
      outline: 'none',
    },
  },

  sendingOverlay: {
    backgroundColor: toRGBA(color.core.neutral[1], 50),
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'all',
    zIndex: 1,
  },

  tag: {
    alignSelf: 'stretch',
    alignItems: 'center',
    display: 'flex',
    border: ui.border,
    borderRadius: unit / 4,
    lineHeight: 1,
    maxWidth: '10em',
    overflow: 'hidden',
    padding: `0 ${unit / 2}px`,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  title: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
});
