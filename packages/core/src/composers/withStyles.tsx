import { withStylesFactory, WithStylesWrappedProps } from 'aesthetic-react';
import { NativeBlock, ParsedBlock } from 'aesthetic-adapter-typestyle';
import { Theme } from '../types';
import Core from '..';

export type WithStylesProps = WithStylesWrappedProps<Theme, NativeBlock, ParsedBlock>;

export default withStylesFactory(Core.aesthetic);
