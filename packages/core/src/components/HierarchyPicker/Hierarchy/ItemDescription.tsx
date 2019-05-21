import React from 'react';
import withStyles, { css, WithStylesProps } from '../../../composers/withStyles';
import Text from '../../Text';
import T from '../../Translate';
import { ItemShape } from '../types';

export type Props = {
  item: ItemShape;
};

export class ItemDescription extends React.Component<Props & WithStylesProps> {
  render() {
    const { item, styles } = this.props;

    return (
      <div>
        <Text bold>
          <T phrase="Description" context="Description of item" />
        </Text>

        <div {...css(styles.description)}>
          <Text>{item.description}</Text>
        </div>
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  description: {
    marginTop: unit / 2,
  },
}))(ItemDescription);
