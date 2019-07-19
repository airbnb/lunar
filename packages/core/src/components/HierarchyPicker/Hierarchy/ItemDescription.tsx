import React from 'react';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import Text from '../../Text';
import T from '../../Translate';
import { ItemShape } from '../types';

export type Props = {
  item: ItemShape;
};

export class ItemDescription extends React.Component<Props & WithStylesProps> {
  render() {
    const { cx, item, styles } = this.props;

    return (
      <div>
        <Text bold>
          <T k="lunar.common.description" phrase="Description" context="Description of item" />
        </Text>

        <div className={cx(styles.description)}>
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
