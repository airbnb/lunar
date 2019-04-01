import React from 'react';
import copy from 'copy-to-clipboard';
import IconCopy from '@airbnb/lunar-icons/lib/interface/IconCopy';
import T from '../Translate';
import Tooltip from '../Tooltip';
import Link from '../Link';

export type Props = {
  /** Custom element to trigger the click. */
  children?: React.ReactElement;
  /** String of text to be copied to the clipboard. */
  text: string;
  /** Callback fired when text is copied. */
  onCopy?: (text: string, copied: boolean) => void;
  /** Custom prompt message to display in the tooltip. */
  prompt?: React.ReactNode;
  /** Add an underline to the element. */
  underlined?: boolean;
};

export type State = {
  copied: boolean;
};

/** A component for easily copying a string of text to the clipboard. */
export default class Copy extends React.Component<Props, State> {
  state = {
    copied: false,
  };

  private handleClick = (event: React.MouseEvent) => {
    const { text, onCopy } = this.props;
    const result = copy(text);

    event.preventDefault();

    this.setState({
      copied: true,
    });

    if (onCopy) {
      onCopy(text, result);
    }
  };

  private handleMouseLeave = () => {
    window.setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 500);
  };

  render() {
    const { prompt, children, underlined } = this.props;
    const element = children || (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link>
        <IconCopy />
      </Link>
    );

    return (
      <Tooltip
        content={
          this.state.copied ? (
            <T phrase="Copied!" context="Text has been copied to a clipboard" />
          ) : (
            prompt || (
              <T
                phrase="Copy to clipboard"
                context="Message informing user to copy test to a clipboard"
              />
            )
          )
        }
        underlined={underlined}
        remainOnMouseDown
      >
        {React.cloneElement(element, {
          onClick: this.handleClick,
          onMouseLeave: this.handleMouseLeave,
        })}
      </Tooltip>
    );
  }
}
