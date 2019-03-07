import React from 'react';
import T from '../../Translate';
import Menu, { Row, Item } from '../../Menu';
import Text from '../../Text';
import Interweave from '../../Interweave';
import TrackingBoundary from '../../TrackingBoundary';
import { ProofreadRuleMatch } from './types';

export type Props = {
  error: ProofreadRuleMatch;
  onReplaceText: (error: ProofreadRuleMatch, replacement: string) => void;
};

export default class ErrorMenu extends React.Component<Props> {
  private handleClick = (replacement: string) => {
    this.props.onReplaceText(this.props.error, replacement);
  };

  render() {
    const { error } = this.props;

    return (
      <TrackingBoundary name="Proofreader/ErrorMenu">
        <Menu
          accessibilityLabel={T.phrase(
            'Spelling or grammar replacements',
            {},
            'Menu with a list of spelling mistake replacements',
          )}
        >
          <Row>
            <Text small muted bold>
              <Interweave content={error.short_message || error.message} />
            </Text>
          </Row>

          {error.replacements!.map(replacement => (
            <Item key={replacement!} onClick={() => this.handleClick(replacement)}>
              <Text>
                {replacement === ' '
                  ? T.phrase('(Space)', {}, 'Represents a space character within the spell checker')
                  : replacement}
              </Text>
            </Item>
          ))}
        </Menu>
      </TrackingBoundary>
    );
  }
}
