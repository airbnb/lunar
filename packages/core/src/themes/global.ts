import { FontFace, GlobalSheet } from 'aesthetic';
import { Theme } from '../types';

export default (fontFaces: { [fontFamily: string]: FontFace[] }) => ({ color, font }: Theme) =>
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
      },
      body: {
        color: color.accent.text,
        backgroundColor: color.base,
        fontFamily: font.fontFamily,
        fontSize: font.textRegular.fontSize,
        lineHeight: font.textRegular.lineHeight,
        // Support upstream in Aesthetic?
        '-ms-text-size-adjust': '100%',
        '-webkit-text-size-adjust': '100%',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },
      'button, input': {
        color: 'inherit',
        backgroundColor: 'inherit',
      },
    },
    '@font-face': fontFaces,
  } as GlobalSheet);
