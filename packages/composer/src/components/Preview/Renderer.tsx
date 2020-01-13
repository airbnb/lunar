import React from 'react';
import Interweave from '@airbnb/lunar/lib/components/Interweave';
import Mark, { MarkProps } from './Mark';
import { ProofreadConfig } from '../../types';

export type RendererProps = {
  errors: ProofreadConfig[];
  isRuleHighlighted?: (rule: ProofreadConfig) => boolean;
  isRuleSecondary?: (rule: ProofreadConfig) => boolean;
  onClickError: MarkProps['onClick'];
  selectedError?: ProofreadConfig;
  value: string;
};

export default function Renderer({
  errors,
  isRuleHighlighted,
  isRuleSecondary,
  onClickError,
  selectedError,
  value,
}: RendererProps) {
  // If no errors, return the value without marks
  if (errors.length === 0) {
    return (
      <div>
        <Interweave content={value} />
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
      <Interweave key={`${lastIndex}-${offset}`} content={value.slice(lastIndex, offset)} />,
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
        onClick={onClickError}
      >
        {word}
      </Mark>,
    );
  });

  // Extract any remaining value
  const final = value.slice(lastIndex);

  content.push(<Interweave key={`${lastIndex}-${lastIndex + final.length}`} content={final} />);

  return <div>{content}</div>;
}
