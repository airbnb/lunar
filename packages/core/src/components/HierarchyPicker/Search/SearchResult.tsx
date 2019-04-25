import React from 'react';
import groupBy from 'lodash/groupBy';
import withStyles, { css, WithStylesProps } from '../../../composers/withStyles';
import Text from '../../Text';
import Highlight from './Highlight';
import { ItemShape, FuseMatch } from '../types';

export type Props = {
  item: ItemShape;
  formattedParents: string;
  matches?: FuseMatch[];
  query?: string;
};

export class SearchResult extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    matches: [],
    query: '',
  };

  render() {
    console.log('search result');
    const { styles, item, formattedParents, matches, query } = this.props;
    const { description, label } = item;
    const mbk = groupBy(matches, 'key');
    const [labelMatch = null] = mbk.label || [];
    const [descMatch = null] = mbk.description || [];
    const [keywMatch = null] = mbk.keywords || [];
    const [longest] = query!.split(/\s{1,}/).sort((a, b) => b.length - a.length);

    return (
      <div {...css(styles.resultItem)}>
        <Text bold>
          {formattedParents}
          <Highlight word={longest} match={labelMatch} fallback={label} />
        </Text>

        {description && (
          <Text>
            <Highlight word={longest} match={descMatch} fallback={description} />
          </Text>
        )}

        {keywMatch && (
          <Text>
            <Highlight word={longest} match={keywMatch} />
          </Text>
        )}
      </div>
    );
  }
}

export default withStyles(({ color, unit }) => ({
  resultItem: {
    padding: unit,

    '@selectors': {
      ':hover, :focus': {
        backgroundColor: color.accent.bgHover,
        outline: 'none',
      },
    },
  },
}))(SearchResult);
