import { withThemeFactory, WithThemeWrappedProps } from 'aesthetic-react';
import { Theme } from '../types';
import Core from '..';

export type WithThemeProps = WithThemeWrappedProps<Theme>;

export default withThemeFactory(Core.aesthetic);
