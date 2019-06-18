import React from 'react';
import {
  DirectionProvider as BaseDirectionProvider,
  DirectionProviderProps,
  DirectionContext,
} from 'aesthetic-react';
import { Omit } from 'utility-types';
import Core from '..';

export { DirectionContext };

export type Props = Omit<DirectionProviderProps, 'aesthetic'>;

export default function DirectionProvider({ children, ...props }: Props) {
  return (
    <BaseDirectionProvider aesthetic={Core.aesthetic} {...props}>
      {children}
    </BaseDirectionProvider>
  );
}
