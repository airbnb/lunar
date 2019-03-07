import { Theme } from '../types';

export default function buildFont(fontFamily: string): Theme['font'] {
  return {
    fontFamily,

    title1: {
      fontFamily,
      fontWeight: 'bold',
      fontSize: 40,
      lineHeight: '50px',
      paddingTop: 8,
      paddingBottom: 8,
      letterSpacing: -0.8,
    },

    title2: {
      fontFamily,
      fontWeight: 'bold',
      fontSize: 32,
      lineHeight: '40px',
      paddingTop: 6,
      paddingBottom: 6,
      letterSpacing: -0.6,
    },

    title3: {
      fontFamily,
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '30px',
      paddingTop: 2,
      paddingBottom: 2,
      letterSpacing: -0.4,
    },

    textLarge: {
      fontFamily,
      fontSize: 18,
      lineHeight: '27px',
      letterSpacing: -0.2,
    },

    textRegular: {
      fontFamily,
      fontSize: 15,
      lineHeight: '22.5px',
      letterSpacing: 0.1,
    },

    textSmall: {
      fontFamily,
      fontSize: 12,
      lineHeight: '18px',
      letterSpacing: 0.2,
    },

    textMicro: {
      fontFamily,
      fontSize: 11,
      lineHeight: '16.5px',
      letterSpacing: 0.3,
    },

    textReset: {
      padding: 0,
      margin: 0,
      fontWeight: 'normal',
      wordWrap: 'break-word',
      display: 'block',
    },

    // https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
    weights: {
      thin: 100,
      light: 300,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
  };
}
