import { StyleBlock } from 'aesthetic';
import { StyleSheet } from '../../hooks/useStyles';

export function cleanClassName(className: string | number) {
  return String(className).replace('.', 'dot');
}

export const styleSheetSpacing: StyleSheet = ({ unit }) => {
  const spacing: { [key: string]: StyleBlock } = {};

  for (let i = 0; i <= 12; i += 0.5) {
    const size = unit * i;

    ['Top', 'Right', 'Bottom', 'Left'].forEach(side => {
      const cleaned = cleanClassName(i);
      spacing[`outer${side}_${cleaned}`] = { [`margin${side}`]: size };
      spacing[`inner${side}_${cleaned}`] = { [`padding${side}`]: size };
    });
  }

  return {
    ...spacing,

    spacing_inline: {
      display: 'inline-block',
    },
  };
};
