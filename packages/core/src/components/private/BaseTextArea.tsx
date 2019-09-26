import React from 'react';
import FormInput, { TextAreaProps } from './FormInput';
import passThroughRef from '../../utils/passThroughRef';

export type Props = TextAreaProps & {
  /** Auto-resize the textarea while typing. */
  autoResize?: boolean;
  /** Max height of the textarea when auto-resizing. */
  maxHeight?: number;
  /** Min height of the textarea when auto-resizing. */
  minHeight?: number;
  /** Callback fired when the value changes. */
  onChange: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default class BaseTextArea extends React.Component<Props> {
  static defaultProps = {
    autoResize: false,
    maxHeight: 400,
    maxLength: null,
    minHeight: 125,
    rows: 3,
    value: '',
  };

  textareaRef: HTMLTextAreaElement | null = null;

  reflowRaf: number | null = null;

  componentDidMount() {
    this.reflowTextarea();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.value !== prevProps.value && !this.reflowRaf) {
      this.reflowRaf = window.requestAnimationFrame(this.reflowTextarea);
    }
  }

  componentWillUnmount() {
    if (this.reflowRaf) {
      window.cancelAnimationFrame(this.reflowRaf);
    }
  }

  /* istanbul ignore next */
  reflowTextarea = () => {
    this.reflowRaf = null;

    const ref = this.textareaRef;
    const { autoResize, minHeight, maxHeight } = this.props as Required<Props>;

    if (!ref || !autoResize) {
      return;
    }

    // Fixed height is set when using the manual browser resizer (bottom right corner)
    const { height } = ref.style;
    const hasBeenResizedManually = height && height !== 'auto';

    // Set heights to auto so that we can calculate the full height of the content
    ref.style.minHeight = 'auto';
    ref.style.height = 'auto';

    // Determine the next height by clamping our boundaries
    const newMinHeight = `${Math.max(minHeight, Math.min(ref.scrollHeight, maxHeight))}px`;

    // If it has been manually resized outside our max, use that fixed height instead
    const newHeight =
      hasBeenResizedManually && height && parseFloat(height) > maxHeight ? height : 'auto';

    // Set the new heights
    ref.style.minHeight = newMinHeight;
    ref.style.height = newHeight;
  };

  private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onChange(event.currentTarget.value, event);
  };

  private loadRef = (ref: HTMLTextAreaElement | null) => {
    this.textareaRef = ref;

    if (ref) {
      this.reflowTextarea();
    }

    passThroughRef(this.props.propagateRef, ref);
  };

  render() {
    const { autoResize, maxHeight, minHeight, ...restProps } = this.props;

    return (
      <FormInput
        {...restProps}
        propagateRef={this.loadRef}
        tagName="textarea"
        onChange={this.handleChange}
      />
    );
  }
}
