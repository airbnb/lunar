import React from 'react';
import { Node } from 'interweave';
import Link from '../../Link';

export default function transformer(node: HTMLElement, children: Node[]): React.ReactNode {
  if (node.tagName.toLowerCase() === 'a') {
    return (
      <Link baseline openInNewWindow href={node.getAttribute('href') || ''}>
        {(children.length > 0 && children) || node.textContent || ''}
      </Link>
    );
  }

  return undefined;
}
