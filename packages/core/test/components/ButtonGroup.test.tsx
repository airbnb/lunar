import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ButtonGroup from '../../src/components/ButtonGroup';
import Button from '../../src/components/Button';

describe('<ButtonGroup />', () => {
  it('renders buttons', () => {
    const wrapper = shallowWithStyles(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders buttons stacked', () => {
    const wrapper = shallowWithStyles(
      <ButtonGroup stacked>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a single button', () => {
    const wrapper = shallowWithStyles(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('handles buttons that return falsy values', () => {
    const wrapper = shallowWithStyles(
      <ButtonGroup stacked>
        {false && <Button>One</Button>}
        {true && <Button>Two</Button>}
        {null && <Button>Three</Button>}
      </ButtonGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('handles components that return a falsy value', () => {
    function FakeButton() {
      return null;
    }

    const wrapper = shallowWithStyles(
      <ButtonGroup stacked>
        <FakeButton />
      </ButtonGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
