import React from 'react';
import Interweave from '../Interweave';
import Mark, { MarkProps } from './Mark';
import { ProofreadRuleMatch } from './types';

export type RendererProps = {
  errors: ProofreadRuleMatch[];
  isRuleHighlighted?: (rule: ProofreadRuleMatch) => boolean;
  isRuleSecondary?: (rule: ProofreadRuleMatch) => boolean;
  onSelectError: MarkProps['onSelect'];
  selectedError?: ProofreadRuleMatch | null;
  shadow?: boolean;
  value: string;
};

export default function Renderer({
  errors,
  isRuleHighlighted,
  isRuleSecondary,
  onSelectError,
  selectedError,
  shadow = false,
  value,
}: RendererProps) {
  // If no errors, return the value without marks
  if (errors.length === 0) {
    return (
      <div>
        <Interweave disableMatchers content={value} />
      </div>
    );
  }

  // Sort errors by offset otherwise slicing does not work
  errors.sort((a, b) => (a.offset ?? 0) - (b.offset ?? 0));

  const content: NonNullable<React.ReactNode>[] = [];
  let lastIndex = 0;

  errors.forEach(error => {
    const offset = error.offset ?? 0;
    const length = error.length ?? 0;

    if (offset > value.length) {
      return;
    }

    // Extract previous string
    content.push(
      <Interweave
        key={`${lastIndex}-${offset}`}
        disableMatchers
        content={value.slice(lastIndex, offset)}
      />,
    );

    // Set new last index
    lastIndex = offset + length;

    // Extract match and wrap in a component
    const word = value.slice(offset, lastIndex);

    content.push(
      <Mark
        key={`${word}-${offset}`}
        error={error}
        highlighted={isRuleHighlighted?.(error)}
        secondary={isRuleSecondary?.(error)}
        selected={error === selectedError}
        shadow={shadow}
        onSelect={onSelectError}
      >
        {word}
      </Mark>,
    );
  });

  // Extract any remaining value
  const final = value.slice(lastIndex);

  content.push(
    <Interweave key={`${lastIndex}-${lastIndex + final.length}`} disableMatchers content={final} />,
  );

  // Add a fake character to the end of the text when a shadow. This solves a handful of bugs
  // in which trailing new lines in combination with scroll position do not work correctly.
  if (shadow) {
    content.push('.');
  }

  return <div>{content}</div>;
}
