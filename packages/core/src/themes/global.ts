import { FontFace, GlobalSheet } from 'aesthetic';
import { Theme } from '../types';

export default (fontFaces: { [fontFamily: string]: FontFace[] }) => ({ color }: Theme) =>
  ({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        ':focus': {
          outlineColor: color.core.primary[3],
        },
      },
      'html, body': {
        height: '100%',
        margin: 0,
        padding: 0,
        color: color.accent.text,
      },
      // CSS resets (override browser styles)
      'button, input': {
        color: 'inherit',
        // Conflicts with O2
        // backgroundColor: 'inherit',
      },
    },
    '@font-face': fontFaces,
  } as GlobalSheet);
