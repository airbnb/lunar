import React from 'react';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import { FuseMatch } from '../types';

export type Props = {
  fallback?: string;
  match?: FuseMatch | null;
  word?: string;
};

export class Highlight extends React.Component<Props & WithStylesProps> {
  render() {
    const { cx, fallback, match, styles, word: searchWord } = this.props;

    if (!match) {
      return <>{fallback}</>;
    }

    const { value, indices = [] } = match;
    const matchIndices = [...indices]; // clean ref

    const output: React.ReactElement<any>[] = [];
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

    return <>{output}</>;
  }
}

export default withStyles(({ color, ui }) => ({
  highlight: {
    borderRadius: ui.borderRadius,
    backgroundColor: color.core.warning[0],

    '@selectors': {
      '> mark': {
        backgroundColor: 'transparent',
        color: 'inherit',
        position: 'relative',
        whiteSpace: 'nowrap',
      },
    },
  },

  highlight_dark: {
    backgroundColor: color.core.warning[3],
  },
}))(Highlight);
