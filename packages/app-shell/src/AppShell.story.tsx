import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@airbnb/lunar/lib/components/Button';
import Input from '@airbnb/lunar/lib/components/Input';
import AppContext from './components/AppContext';
import AppShell from '.';

class PageDataExample extends React.Component<{ onSubmit: Function }, { data: string }> {
  state = {
    data: '',
  };

  handleChange = (value: string) => {
    this.setState({
      data: value,
    });
  };

  handleSubmit = () => {
    this.props.onSubmit({ example: this.state.data });

    this.setState({
      data: '',
    });
  };

  render() {
    return (
      <div>
        <Input label="Example data" onChange={this.handleChange} value={this.state.data} />
        <Button onClick={this.handleSubmit}>Add page data</Button>
      </div>
    );
  }
}

storiesOf('AppShell', module)
  .add('Supports toasts.', () => (
    <AppShell name="Lunar">
      <AppContext.Consumer>
        {({ addSuccessToast, addFailureToast }: any) => (
          <div>
            <Button
              onClick={() => {
                addSuccessToast('Changes have been saved.', { duration: 0 });
              }}
            >
              Display success toast that never disappears
            </Button>

            <br />
            <br />

            <Button
              onClick={() => {
                addFailureToast('Changes failed to save!', { title: 'Oops' });
              }}
            >
              Display error toast with a custom title
            </Button>
          </div>
        )}
      </AppContext.Consumer>
    </AppShell>
  ))
  .add('Supports page data.', () => (
    <AppShell name="Lunar">
      <AppContext.Consumer>
        {({ addPageData, data }: any) => (
          <div>
            <PageDataExample onSubmit={addPageData} />

            <br />
            <br />

            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </AppContext.Consumer>
    </AppShell>
  ));
