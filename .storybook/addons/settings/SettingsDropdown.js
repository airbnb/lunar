import React from 'react';
import { Icons, IconButton, WithTooltip } from '@storybook/components';
import Form from './Form';

export default class SettingsDropdown extends React.Component {
  state = {
    theme: localStorage.getItem('storybook.theme') || 'light',
    rtl: localStorage.getItem('storybook.rtl') === 'true',
    expanded: false,
  };

  changeTheme(theme) {
    this.setState({
      theme,
      expanded: false,
    });

    localStorage.setItem('storybook.theme', theme);

    location.reload(true);
  }

  changeRTL(rtl) {
    this.setState({
      rtl,
      expanded: false,
    });

    localStorage.setItem('storybook.rtl', rtl);

    location.reload(true);
  }

  handleChangeTheme = event => {
    this.changeTheme(event.currentTarget.value);
  };

  handleChangeRTL = event => {
    this.changeRTL(event.currentTarget.checked);
  };

  handleVisibilityChange = expanded => {
    if (this.state.expanded !== expanded) {
      this.setState({ expanded });
    }
  };

  render() {
    const { theme, rtl, expanded } = this.state;

    return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltipShown={expanded}
        onVisibilityChange={this.handleVisibilityChange}
        tooltip={
          <Form
            rtl={rtl}
            theme={theme}
            onChangeRTL={this.handleChangeRTL}
            onChangeTheme={this.handleChangeTheme}
          />
        }
        closeOnClick
      >
        <IconButton key="settings" title="Change Lunar settings">
          <Icons icon="cog" />
        </IconButton>
      </WithTooltip>
    );
  }
}
