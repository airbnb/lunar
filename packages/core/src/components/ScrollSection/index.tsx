import React from 'react';
import ScrollWrapper from './ScrollWrapper';
import ScrollSectionContext, { Context } from './ScrollContext';

export { ScrollWrapper, ScrollSectionContext };

export type InternalScrollSectionProps = {
  /** A globally unique ID for this scroll section. Will be the ID of the wrapper. */
  id: string;
  /** The contents of the section. */
  children: NonNullable<React.ReactNode>;
};

export type PrivateProps = {
  /** @ignore */
  scrollContext: Context;
};

/** @ignore */
export class InternalScrollSection extends React.Component<
  InternalScrollSectionProps & PrivateProps
> {
  private handleRef = (ref: HTMLDivElement | null) => {
    const { id, scrollContext } = this.props;

    scrollContext.removeScrollAnchor(id);

    if (ref) {
      scrollContext.addScrollAnchor(id, ref);
    }
  };

  render() {
    const { children, id } = this.props;

    return (
      <section ref={this.handleRef} id={id}>
        {children}
      </section>
    );
  }
}

/**
 * A section of the page that's measured for active scrolling by wrapping children in section
 * tag that can be scrolled to. Used in conjunction with `ScrollWrapper`.
 */
export default function ScrollSection(props: InternalScrollSectionProps) {
  return (
    <ScrollSectionContext.Consumer>
      {scrollContext =>
        scrollContext && <InternalScrollSection {...props} scrollContext={scrollContext} />
      }
    </ScrollSectionContext.Consumer>
  );
}
