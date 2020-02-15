import React from 'react';
import Spacing from '../../Spacing';
import Text from '../../Text';
import T from '../../Translate';
import { ItemShape } from '../types';

export type Props = {
  item: ItemShape;
};

export default function ItemDescription({ item }: Props) {
  return (
    <div>
      <Text bold>
        <T k="lunar.common.description" phrase="Description" context="Description of item" />
      </Text>

      <Spacing top={0.5}>
        <Text>{item.description}</Text>
      </Spacing>
    </div>
  );
}
