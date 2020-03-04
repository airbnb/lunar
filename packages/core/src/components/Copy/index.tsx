import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import IconCopy from '@airbnb/lunar-icons/lib/interface/IconCopy';
import T from '../Translate';
import Tooltip from '../Tooltip';
import Link from '../Link';

export type CopyProps = {
  /** Custom element to trigger the click. */
  children?: React.ReactElement;
  /** Pass an HTML element attribute id to the Link. */
  id?: string;
  /** String of text to be copied to the clipboard. */
  text: string;
  /** Callback fired when text is copied. */
  onCopy?: (text: string, copied: boolean) => void;
  /** Custom prompt message to display in the tooltip. */
  prompt?: React.ReactNode;
  /** A tracking name to identify this component. */
  trackingName?: string;
  /** Add an underline to the element. */
  underlined?: boolean;
};

export type CopyState = {
  copied: boolean;
};

/** A component for easily copying a string of text to the clipboard. */
export default function Copy({
  children,
  text,
  id,
  trackingName,
  underlined,
  prompt,
  onCopy,
}: CopyProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    const result = copy(text);

    event.preventDefault();
    setCopied(true);

    if (onCopy) {
      onCopy(text, result);
    }
  };

  const handleMouseLeave = () => {
    window.setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  const element = children || (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link trackingName={trackingName} id={id}>
      <IconCopy decorative />
    </Link>
  );

  return (
    <Tooltip
      remainOnMouseDown
      content={
        copied ? (
          <T k="lunar.copy.copied" phrase="Copied!" />
        ) : (
          prompt || <T k="lunar.copy.copyToClipboard" phrase="Copy to clipboard" />
        )
      }
      underlined={underlined}
    >
      {React.cloneElement(element, {
        onClick: handleClick,
        onMouseLeave: handleMouseLeave,
      })}
    </Tooltip>
  );
}
