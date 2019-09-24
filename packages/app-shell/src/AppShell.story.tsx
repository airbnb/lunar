import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@airbnb/lunar/lib/components/Button';
import Input from '@airbnb/lunar/lib/components/Input';
import Breadcrumbs, { TrackBreadcrumb } from './components/Breadcrumbs';
import { PopToast } from './components/Toasts';
import AppContext from './components/AppContext';
import AppShell from '.';
import { Context } from './types';

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
        <Input label="Example data" value={this.state.data} onChange={this.handleChange} />
        <Button onClick={this.handleSubmit}>Add page data</Button>
      </div>
    );
  }
}

storiesOf('AppShell', module)
  .addParameters({
    inspectComponents: [AppShell],
  })
  .add('Supports toasts.', () => (
    <AppShell name="Lunar">
      <AppContext.Consumer>
        {({ addSuccessToast, addFailureToast }: Context) => (
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
  .add('Displays a toast using a component.', () => (
    <AppShell name="Lunar">
      <PopToast
        message="This message is displayed by rendering a component and not using context!"
        duration={0}
      />
    </AppShell>
  ))
  .add('Displays a trail of breadcrumbs using components.', () => (
    <AppShell name="Lunar">
      <TrackBreadcrumb label="Countries" href="/countries" />
      <TrackBreadcrumb label="America" href="/countries/usa" />
      <TrackBreadcrumb label="California" href="/countries/usa/ca" />
      <Breadcrumbs accessibilityLabel="Navigation" />
    </AppShell>
  ))
  .add('Supports page data.', () => (
    <AppShell name="Lunar">
      <AppContext.Consumer>
        {({ addPageData, data }: Context) => (
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
