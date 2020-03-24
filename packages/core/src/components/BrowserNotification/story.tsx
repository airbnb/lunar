import React from 'react';
import Button from '../Button';
import Input from '../Input';
import BrowserNotification from '.';

type BrowserNotificationExampleState = {
  showNotification: boolean;
  title: string;
  body: string;
  icon: string;
  tag: string;
};

class BrowserNotificationExample extends React.Component<{}, BrowserNotificationExampleState> {
  state = {
    showNotification: false,
    title: '',
    body: '',
    icon: '',
    tag: '',
  };

  toggleNotification() {
    this.setState(({ showNotification }) => ({ showNotification: !showNotification }));
  }

  handleChange(field: keyof BrowserNotificationExampleState, value: string) {
    this.setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  render() {
    const { showNotification, title, body, icon, tag } = this.state;

    return (
      <div>
        {showNotification && (
          <BrowserNotification title={title} body={body} icon={icon} tag={tag} />
        )}

        <Input
          name="title"
          label="Title"
          value={title}
          onChange={(val) => this.handleChange('title', val)}
        />

        <Input
          name="body"
          label="Body"
          value={body}
          onChange={(val) => this.handleChange('body', val)}
        />

        <Input
          name="icon"
          label="Icon"
          value={icon}
          onChange={(val) => this.handleChange('icon', val)}
        />

        <Input
          name="tag"
          label="Tag"
          value={tag}
          onChange={(val) => this.handleChange('tag', val)}
        />

        <Button onClick={() => this.toggleNotification()}>Toggle notification</Button>
      </div>
    );
  }
}

export default {
  title: 'Core/BrowserNotification',
  parameters: {
    inspectComponents: [BrowserNotification],
  },
};

export function displayBrowserNotifications() {
  return <BrowserNotificationExample />;
}

displayBrowserNotifications.story = {
  name: 'Display browser notifications.',
};
