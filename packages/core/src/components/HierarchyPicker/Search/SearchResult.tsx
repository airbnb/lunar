import React from 'react';
import groupBy from 'lodash/groupBy';
import useStyles from '../../../hooks/useStyles';
import Text from '../../Text';
import Highlight from './Highlight';
import { ItemShape, FuseMatch } from '../types';
import { styleSheetSearchResult as styleSheet } from './styles';

export type Props = {
  item: ItemShape;
  formattedParents: string;
  matches?: FuseMatch[];
  query?: string;
};

export default function SearchResult({ item, formattedParents, matches = [], query = '' }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  const { description, label, name } = item;
  const mbk = groupBy(matches, 'key');
  const [labelMatch = null] = mbk.label || [];
  const [descMatch = null] = mbk.description || [];
  const [keywMatch = null] = mbk.keywords || [];
  const [longest] = query!.split(/\s{1,}/).sort((a, b) => b.length - a.length);

  return (
    <div className={cx(styles.resultItem)}>
      <Text bold>
        {formattedParents}
        <Highlight word={longest} match={labelMatch} fallback={label || name} />
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
