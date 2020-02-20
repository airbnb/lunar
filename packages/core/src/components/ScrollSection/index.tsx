import React, { useContext } from 'react';
import ScrollWrapper from './ScrollWrapper';
import ScrollSectionContext from './ScrollContext';

export { ScrollWrapper, ScrollSectionContext };

export type ScrollSectionProps = {
  /** A globally unique ID for this scroll section. Will be the ID of the wrapper. */
  id: string;
  /** The contents of the section. */
  children: NonNullable<React.ReactNode>;
};

/**
 * A section of the page that's measured for active scrolling by wrapping children in section
 * tag that can be scrolled to. Used in conjunction with `ScrollWrapper`.
 */
export default function ScrollSection({ children, id }: ScrollSectionProps) {
  const context = useContext(ScrollSectionContext);

  if (!context) {
    return null;
  }

  const handleRef = (ref: HTMLDivElement | null) => {
    context.removeScrollAnchor(id);

    if (ref) {
      context.addScrollAnchor(id, ref);
    }
  };

  return (
    <section ref={handleRef} id={id}>
      {children}
    </section>
  );
}
