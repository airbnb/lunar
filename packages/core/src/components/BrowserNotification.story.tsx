import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import Input from './Input';
import BrowserNotification from './BrowserNotification';

type State = {
  showNotification: boolean;
  title: string;
  body: string;
  icon: string;
  tag: string;
};

class BrowserNotificationExample extends React.Component<{}, State> {
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

  handleChange(field: keyof State, value: string) {
    this.setState({
      [field]: value,
    } as any);
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
          onChange={val => this.handleChange('title', val)}
          value={title}
        />

        <Input
          name="body"
          label="Body"
          onChange={val => this.handleChange('body', val)}
          value={body}
        />

        <Input
          name="icon"
          label="Icon"
          onChange={val => this.handleChange('icon', val)}
          value={icon}
        />

        <Input name="tag" label="Tag" onChange={val => this.handleChange('tag', val)} value={tag} />

        <Button onClick={() => this.toggleNotification()}>Toggle notification</Button>
      </div>
    );
  }
}

storiesOf('Core/BrowserNotification', module).add('Display browser notifications.', () => (
  <BrowserNotificationExample />
));
