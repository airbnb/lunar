import React from 'react';
import List from '../List';

export type TimelineProps = {
  /** Collection of timeline items. */
  children: NonNullable<React.ReactNode>;
};

/** A chronologically ordered list of items. Ordering is determined by caller. */
export default function Timeline({ children }: TimelineProps) {
  return <List ordered>{children}</List>;
}
