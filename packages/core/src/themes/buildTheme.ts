import buildFont from './buildFont';
import { breakpoints, responsive } from './size';
import { Theme } from '../types';
import toRGBA from '../utils/toRGBA';

export type Options = {
  base: string;
  borderRadius?: number;
  boxShadow?: [number, number];
  brand: Theme['color']['brand'];
  color: Theme['color']['core'];
  disabledOpacity?: number;
  fontFamily: string;
  transitionTime?: string;
};

export default function buildTheme(
  options: Options,
  accents: Partial<Theme['color']['accent']> = {},
): Theme {
  const {
    base,
    borderRadius = 3,
    boxShadow = [2, 3],
    brand,
    color,
    disabledOpacity = 0.3,
    transitionTime = '300ms',
  } = options;
  const accent = {
    bg: base,
    bgHover: color.neutral[0],
    bgError: color.danger[0],
    border: color.neutral[2],
    borderHover: color.neutral[3],
    borderError: color.danger[3],
    borderFocus: color.primary[3], // Also active/selected
    text: color.neutral[5],
    textError: color.danger[3],
    ...accents,
  };

  const ui = {
    border: `1px solid ${accent.border}`,
    borderThick: `2px solid ${accent.border}`,
    borderRadius,
    borderRadiusThick: borderRadius * 2,
    boxShadow: `0 ${boxShadow[0]}px ${boxShadow[1]}px ${toRGBA(color.neutral[6], 10)}`,
    boxShadowMedium: `0 ${boxShadow[0] * 3}px ${boxShadow[1] * 2}px ${toRGBA(
      color.neutral[6],
      15,
    )}`,
    boxShadowLarge: `0 ${boxShadow[0] * 4}px ${boxShadow[1] * 4}px ${toRGBA(color.neutral[6], 20)}`,
    disabledOpacity,
    transitionTime,
  };

  const font = buildFont(options.fontFamily);
  const unit = 8;

  return {
    color: {
      accent,
      base,
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
        borderColor: accent.borderFocus,
        outline: 'none',
      },
      invalid: {
        color: accent.textError,
        backgroundColor: accent.bgError,
        borderColor: accent.borderError,
      },
      offscreen: {
        position: 'absolute',
        left: -9999,
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
        padding: `${unit * 0.75}px ${unit * 1.25}px`,
      },
      regularButton: {
        ...font.textRegular,
        padding: `${unit * 1.25}px ${unit * 1.5}px`,
      },
      largeButton: {
        ...font.textLarge,
        padding: `${unit * 1.5}px ${unit * 2.5}px`,
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
