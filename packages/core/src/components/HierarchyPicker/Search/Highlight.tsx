import React from 'react';
import useStyles from '../../../hooks/useStyles';
import { FuseMatch } from '../types';
import { styleSheetHighlight as styleSheet } from './styles';

export type HighlightProps = {
  fallback?: string;
  match?: FuseMatch | null;
  word?: string;
};

export default function Highlight({ fallback, match, word: searchWord }: HighlightProps) {
  const [styles, cx] = useStyles(styleSheet);

  if (!match) {
    return <span>{fallback}</span>;
  }

  const { value, indices = [] } = match;
  const matchIndices = [...indices]; // clean ref
  const output: React.ReactElement[] = [];
  let pair = matchIndices.shift();
  let substr = '';

  for (let i = 0; i < value.length; i += 1) {
    // if substr exists and we reach the start index of a match, push current substr and reset
    if (pair && substr && i === pair[0]) {
      output.push(<span key={`${i}-start`}>{substr}</span>);
      substr = '';
    }

    substr += value.charAt(i);

    // push highlight when we reach the end index of a match
    if (pair && i === pair[1]) {
      if (substr) {
        output.push(
          <span
            key={`end-${i}`}
            className={cx(
              styles.highlight,
              substr.trim().toLowerCase() === searchWord && styles.highlight_dark,
            )}
          >
            <mark>{substr}</mark>
          </span>,
        );
      }

      substr = '';
      pair = matchIndices.shift();
    }
  }

  if (substr) {
    output.push(<span key="last">{substr}</span>);
  }

  return <span>{output}</span>;
}
