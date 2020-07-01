import buildFont from './buildFont';
import { breakpoints, responsive } from './size';
import { Theme } from '../types';
import toRGBA from '../utils/toRGBA';

export type Options = {
  base: string;
  baseInverse: string;
  borderRadius?: number;
  boxShadow?: [number, number];
  boxShadowColor?: string;
  brand: Theme['color']['brand'];
  color: Theme['color']['core'];
  disabledOpacity?: number;
  fontFamily: string;
  transitionTime?: string;
};

const borderWidth = 1;
const borderWidthThick = 2;

export default function buildTheme(
  options: Options,
  accents: Partial<Theme['color']['accent']> = {},
): Theme {
  const {
    base,
    baseInverse,
    borderRadius = 4,
    boxShadow = [2, 4],
    boxShadowColor = base,
    brand,
    color,
    disabledOpacity = 0.3,
    transitionTime = '300ms',
  } = options;

  const accent = {
    bg: base,
    bgHover: color.neutral[0],
    bgError: color.danger[0],
    blackout: toRGBA('#000', 75), // Use black regardless of theme
    border: color.neutral[2],
    borderActive: color.primary[3], // Also focus/selected
    borderHover: color.neutral[3],
    borderError: color.danger[3],
    outline: color.primary[3],
    text: color.neutral[5],
    textActive: color.primary[3],
    textError: color.danger[3],
    ...accents,
  };

  const ui = {
    border: `${borderWidth}px solid ${accent.border}`,
    borderThick: `${borderWidthThick}px solid ${accent.border}`,
    borderRadius,
    borderRadiusRounded: borderRadius * 8,
    borderRadiusThick: borderRadius * 2,
    borderWidth,
    borderWidthThick,
    boxShadow: `0 ${boxShadow[0] * 2}px ${boxShadow[1] * 4}px ${toRGBA(boxShadowColor, 12)}`,
    boxShadowMedium: `0 ${boxShadow[0] * 3}px ${boxShadow[1] * 5}px ${toRGBA(boxShadowColor, 20)}`,
    boxShadowLarge: `0 ${boxShadow[0] * 4}px ${boxShadow[1] * 7}px ${toRGBA(boxShadowColor, 28)}`,
    disabledOpacity,
    transitionTime,
  };

  const font = buildFont(options.fontFamily);
  const unit = 8;

  return {
    color: {
      accent,
      base,
      baseInverse,
      brand,
      core: color,
      clear: 'transparent',
      muted: color.neutral[4],
    },
    font,
    pattern: {
      box: {
        border: ui.border,
        borderRadius,
        boxShadow: ui.boxShadow,
      },

      disabled: {
        opacity: disabledOpacity,
        cursor: 'normal',
      },

      focused: {
        borderColor: accent.borderActive,
        outline: 'none',
      },

      themedFocus: {
        outline: 'none',
        boxShadow: `${accent.bg} 0px 0px 0px 2px, ${accent.outline} 0px 0px 0px 3px, ${toRGBA(
          accent.bg,
          50,
        )} 0px 0px 0px 4px`,
      },

      invalid: {
        color: accent.textError,
        backgroundColor: accent.bgError,
        borderColor: accent.borderError,
      },

      offscreen: {
        position: 'absolute',
        left: '-5vw',
        width: 1,
        height: 1,
        overflow: 'hidden',
      },

      resetButton: {
        appearance: 'none',
        background: 'transparent',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        border: 0,
        userSelect: 'auto',
        textDecoration: 'none',
        fontSize: 'inherit',
        verticalAlign: 'middle',
        display: 'inline-block',
      },

      smallButton: {
        ...font.textSmall,
        padding: `${unit - borderWidthThick}px ${unit * 1.5 - borderWidthThick}px`,
      },

      regularButton: {
        ...font.textRegular,
        padding: `${unit * 1.25 - borderWidthThick}px ${unit * 1.5 - borderWidthThick}px`,
      },

      largeButton: {
        ...font.textLarge,
        padding: `${unit * 1.5 - borderWidthThick}px ${unit * 2 - borderWidthThick}px`,
      },
    },
    breakpoints,
    responsive,
    transition: {
      box: {
        transition: `background ${transitionTime}, border ${transitionTime}, color ${transitionTime}`,
      },

      fade: {
        opacity: 1,
        transition: `opacity ${transitionTime}`,
      },
    },
    ui,
    unit,
  };
}
