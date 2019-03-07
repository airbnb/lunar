import React from 'react';
import Text from '../Text';

const EMPTY = (
  <Text small light muted inline>
    —
  </Text>
);

/** Display a muted dash when empty content or no content is found. */
export default class Empty extends React.Component {
  /*
   * We use this component a lot, and it's completely static, so let's always bail on updating
   * it to improve performance (especially given how many of this component is rendered).
   */
  /* istanbul ignore next */
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return EMPTY;
  }
}
