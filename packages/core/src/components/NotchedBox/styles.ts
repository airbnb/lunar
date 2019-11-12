import { StyleSheet } from '../../hooks/useStyles';

export const NOTCH_SIZE = 1.5;
export const NOTCH_SPACING = 1.5;

export function createPosition(offset: number | string) {
  if (typeof offset === 'number' && offset < 0) {
    return { right: Math.abs(offset) };
  }

  return { left: offset };
}

const styleSheet: StyleSheet = ({ ui, color, unit }) => {
  const { border, borderRadius } = ui;
  const notchSide = NOTCH_SIZE * unit;
  const offset = -notchSide / 2;
  const left = unit + notchSide / Math.SQRT2;

  return {
    box: {
      position: 'relative',
      borderRadius,
    },

    box_inline: {
      display: 'inline-block',
    },

    notch: {
      width: notchSide,
      height: notchSide,
      position: 'absolute',
      backgroundColor: color.accent.bg,
      transform: `translate(${offset}px, ${offset}px) rotate(-45deg)`,
    },

    notch_position: createPosition(left),

    notch_below: {
      bottom: -notchSide,
    },

    border: {
      border,
    },

    inverted: {
      borderColor: color.clear,
      backgroundColor: color.core.neutral[6],
    },

    content: {
      padding: NOTCH_SPACING * unit,
      position: 'relative',
      backgroundColor: color.accent.bg,
      borderRadius,
    },
  };
};

export default styleSheet;

export { styleSheet };
