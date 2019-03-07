A component that can be used to display browser notifications.

```jsx
import Button from '../Button';
import Input from '../Input';

class BrowserNotificationDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      showNotification: false,
      title: '',
      body: '',
      icon: '',
      tag: '',
    };
  }

  toggleNotification() {
    this.setState(({ showNotification }) => ({ showNotification: !showNotification }));
  }

  handleChange(field, value) {
    this.setState({
      [field]: value,
    });
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
        <br />
        <Input
          name="body"
          label="Body"
          onChange={val => this.handleChange('body', val)}
          value={body}
        />
        <br />
        <Input
          name="icon"
          label="Icon"
          onChange={val => this.handleChange('icon', val)}
          value={icon}
        />
        <br />
        <Input name="tag" label="Tag" onChange={val => this.handleChange('tag', val)} value={tag} />
        <br />

        <Button onClick={() => this.toggleNotification()}>Toggle notification</Button>
      </div>
    );
  }
}

<BrowserNotificationDemo />;
```
