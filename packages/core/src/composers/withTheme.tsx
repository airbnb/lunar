import { withThemeFactory, WithThemeWrappedProps } from 'aesthetic-react';
import { Theme } from '../types';
import Core from '..';

export type WithStylesProps = WithThemeWrappedProps<Theme>;

export default withThemeFactory(Core.aesthetic);
