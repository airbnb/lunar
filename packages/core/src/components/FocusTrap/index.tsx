import React from 'react';
import { TAB } from '../../keys';
import focusableSelector from '../../utils/focusableSelector';

export type FocusTrapProps = {
  /** Content to wrap. */
  children: NonNullable<React.ReactNode>;
  /** Disable automatic focusing. */
  disabled?: boolean;
};

/** Automatically trap and apply focus to elements wrapped within. */
export default class FocusTrap extends React.PureComponent<FocusTrapProps> {
  static defaultProps = {
    disabled: false,
  };

  nodeRef = React.createRef<HTMLDivElement>();

  getFocusableElements(): Element[] {
    if (!this.nodeRef.current) {
      return [];
    }

    return Array.from(this.nodeRef.current.querySelectorAll(focusableSelector));
  }

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (this.props.disabled || event.key !== TAB) {
      return;
    }

    const focusableElements = this.getFocusableElements();

    if (focusableElements.length === 0 || !document.activeElement) {
      return;
    }

    let focusIndex = focusableElements.indexOf(document.activeElement);
    const initialIndex = focusIndex;

    do {
      if (event.shiftKey) {
        if (focusIndex < 1) {
          // Currently focusing either the first element (focusIndex = 0),
          // or no element (focusIndex = -1), so jump to the last focusable element.
          focusIndex = focusableElements.length - 1;
        } else {
          focusIndex -= 1;
        }
      } else if (focusIndex === focusableElements.length - 1) {
        // Tabbing forward from end of trap, so jump to beginning.
        focusIndex = 0;
      } else {
        // Note that this also catches the case where focusIndex = -1,
        // in which case we focus index 0, which is the correct functionality.
        focusIndex += 1;
      }

      const element = focusableElements[focusIndex];

      if (element instanceof HTMLElement) {
        element.focus();
      }

      // On the off chance that we are able to begin tabbing in a trap with
      // only untabbable elements, we want to break out of an infinite loop.
      if (focusIndex === initialIndex) {
        break;
      }

      // Trying to focus on an element with e.g. display: none or visibility: hidden
      // will fail, so we need to find the next element to focus in that case.
    } while (document.activeElement !== focusableElements[focusIndex]);

    event.preventDefault();
  };

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div ref={this.nodeRef} onKeyDown={this.handleKeyDown}>
        {this.props.children}
      </div>
    );
  }
}
