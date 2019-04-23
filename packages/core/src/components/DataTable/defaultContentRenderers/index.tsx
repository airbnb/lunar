import React from 'react';

import TextInputRenderer from './TextInputRenderer';
import TextRenderer from './TextRenderer';
import { RendererProps } from '../types';

export default function DefaultContentRenderer(props: RendererProps) {
  if (props.editMode) {
    return <TextInputRenderer {...props} />;
  }

  return <TextRenderer {...props} />;
}
