import React from 'react';
import withStyles, { css, WithStylesProps } from '../../../composers/withStyles';
import { FuseMatch } from '../types';

export type Props = {
  fallback?: string;
  match?: FuseMatch | null;
  word?: string;
};

export class Highlight extends React.Component<Props & WithStylesProps> {
  render() {
    const { fallback, match, styles, word } = this.props;

    if (!match) {
      return <>{fallback}</>;
    }

    const { value, indices = [] } = match;
    const matchIndices = [...indices]; // clean ref

    if (matchIndices.length === 0) {
      return <>{value}</>;
    }

    const output: React.ReactElement<any>[] = [];
    let pair = matchIndices.shift();
    let sacc = '';

    for (let i = 0; i < value.length; i += 1) {
      if (pair && sacc && i === pair[0]) {
        output.push(<span key={i}>{sacc}</span>);
        sacc = '';
      }

      sacc += value.charAt(i);

      if (pair && i === pair[1]) {
        output.push(
          <span {...css(styles.highlight)} key={i}>
            <span
              style={{
                opacity: sacc.trim().toLowerCase() === word ? 1 : 0.33,
              }}
            />
            <mark>{sacc}</mark>
          </span>,
        );

        sacc = '';
        pair = matchIndices.shift();
      }
    }

    if (sacc) {
      output.push(<span key="last">{sacc}</span>);
    }

    return <>{output}</>;
  }
}

export default withStyles(({ color, ui }) => ({
  highlight: {
    position: 'relative',

    '@selectors': {
      '> span': {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        borderRadius: ui.borderRadius,
        backgroundColor: color.core.warning[3],
      },

      '> mark': {
        backgroundColor: 'transparent',
        color: 'inherit',
        position: 'relative',
        whiteSpace: 'nowrap',
      },
    },
  },
}))(Highlight);
