import TextInputRenderer from './TextInputRenderer';
import TextRenderer from './TextRenderer';
import { RendererProps } from '../types';

export default function DefaultContentRenderer(props: RendererProps): NonNullable<React.ReactNode> {
  if (props.editMode) {
    return TextInputRenderer(props);
  }

  return TextRenderer(props);
}
