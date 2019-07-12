import { withStylesFactory, WithStylesWrappedProps } from 'aesthetic-react';
import { NativeBlock, ParsedBlock } from 'aesthetic-adapter-aphrodite';
import { Theme as BaseTheme } from '../types';
import Core from '..';

export type WithStylesProps = WithStylesWrappedProps<BaseTheme, NativeBlock, ParsedBlock>;
export type Theme = BaseTheme;

export default withStylesFactory(Core.aesthetic);
