import React from 'react';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import Chip from '../../Chip';

export type Props = {
  /** Value to display. */
  value: string;
  /** Callback when the icon is clicked. */
  onClick: (value: string, event: React.MouseEvent<any>) => void;
};

export default class MulticompleteChip extends React.Component<Props> {
  private handleClick = (event: React.MouseEvent<any>) => {
    this.props.onClick(this.props.value, event);
  };

  render() {
    const { value } = this.props;

    return (
      <Chip icon={<IconCloseAlt decorative size="2em" />} onIconClick={this.handleClick}>
        {value}
      </Chip>
    );
  }
}
