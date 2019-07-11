import { Theme } from '../types';

export const breakpoints = {
  xsmall: 767,
  small: 980,
  medium: 1280,
  large: 1690,
};

export const responsive: Theme['responsive'] = {
  xsmall: `(max-width: ${breakpoints.xsmall}px)`,
  small: `(max-width: ${breakpoints.medium - 1}px)`,
  medium: `(min-width: ${breakpoints.medium}px)`,
  large: `(min-width: ${breakpoints.large}px)`,
};
