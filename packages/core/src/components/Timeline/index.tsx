import React from 'react';

export type TimelineProps = {
  /** Collection of timeline items. */
  children: NonNullable<React.ReactNode>;
};

/** A chronologically ordered list of items. Ordering is determined by caller. */
export default function Timeline({ children }: TimelineProps) {
  return <>{children}</>;
}
