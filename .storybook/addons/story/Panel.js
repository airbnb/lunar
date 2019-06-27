import React from 'react';
import { styled } from '@storybook/theming';
import { SyntaxHighlighter } from '@storybook/components';

const Wrapper = styled.div({
  padding: 16,
  fontSize: 14,
});

export default class Panel extends React.Component {
  static defaultProps = {
    active: false,
  };

  state = {
    storySource: '',
  };

  componentDidMount() {
    this.props.channel.on('SET_STORY_DATA', this.handleSetData);
  }

  componentWillUnmount() {
    this.props.channel.removeListener('SET_STORY_DATA', this.handleSetData);
  }

  handleSetData = ({ storySource }) => {
    this.setState({ storySource });
  };

  render() {
    const { active } = this.props;
    const { storySource } = this.state;

    if (!active) {
      return null;
    }

    return (
      <Wrapper>
        <SyntaxHighlighter bordered copyable format={false} language="jsx">
          {storySource}
        </SyntaxHighlighter>
      </Wrapper>
    );
  }
}
