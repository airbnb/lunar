import React from 'react';
import ReactDOM from 'react-dom';

export type Props = {
  /** Content to render in the portal. */
  children: NonNullable<React.ReactNode>;
};

/** Render within a portal using a declarative component API. */
export default class Portal extends React.PureComponent<Props> {
  private node?: HTMLDivElement;

  componentWillUnmount() {
    if (this.node) {
      document.body.removeChild(this.node);
      delete this.node;
    }
  }

  render() {
    if (!this.node) {
      this.node = document.createElement('div');
      document.body.append(this.node);
    }

    return ReactDOM.createPortal(this.props.children, this.node);
  }
}
