import React from 'react';
import { shallow } from 'enzyme';
import ButtonGroup from '../../src/components/ButtonGroup';
import Button from '../../src/components/Button';

describe('<ButtonGroup />', () => {
  it('renders buttons', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    );

    expect(wrapper.find(Button)).toHaveLength(3);
  });

  it('renders buttons to the end', () => {
    const wrapper = shallow(
      <ButtonGroup endAlign>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    );

    expect(wrapper.prop('className')).toMatch('buttonGroup_endAlign');
    expect(wrapper.find(Button)).toHaveLength(3);
  });

  it('renders buttons stacked', () => {
    const wrapper = shallow(
      <ButtonGroup stacked>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    );

    expect(wrapper.prop('className')).toMatch('buttonGroup_stacked');
    expect(wrapper.find(Button)).toHaveLength(3);
  });

  it('renders a single button', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>,
    );

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('handles buttons that return falsy values', () => {
    const wrapper = shallow(
      <ButtonGroup stacked>
        {false && <Button>One</Button>}
        {true && <Button>Two</Button>}
        {null && <Button>Three</Button>}
      </ButtonGroup>,
    );

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('handles components that return a falsy value', () => {
    function FakeButton() {
      return null;
    }

    const wrapper = shallow(
      <ButtonGroup stacked>
        <FakeButton />
      </ButtonGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
