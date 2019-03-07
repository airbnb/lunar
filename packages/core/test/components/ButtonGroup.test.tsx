import React from 'react';
import { shallow } from 'enzyme';
import ButtonGroup from '../../src/components/ButtonGroup';
import Button from '../../src/components/Button';
import Loader from '../../src/components/Loader';
import Tooltip from '../../src/components/Tooltip';

describe('<ButtonGroup />', () => {
  it('errors when a non-button is passed', () => {
    expect(() => {
      shallow(
        <ButtonGroup>
          <Loader />
        </ButtonGroup>,
      ).dive();
    }).toThrowErrorMatchingSnapshot();
  });

  it('doesnt error when `Tooltip` is wrapping', () => {
    expect(() => {
      shallow(
        <ButtonGroup>
          <Tooltip content="">
            <Button>One</Button>
          </Tooltip>
        </ButtonGroup>,
      ).dive();
    }).not.toThrowError();
  });

  it('renders buttons', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders buttons stacked', () => {
    const wrapper = shallow(
      <ButtonGroup stacked>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a single button', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('handles buttons that return falsy values', () => {
    const wrapper = shallow(
      <ButtonGroup stacked>
        {false && <Button>One</Button>}
        {true && <Button>Two</Button>}
        {null && <Button>Three</Button>}
      </ButtonGroup>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('handles components that return a falsy value', () => {
    function FakeButton() {
      return null;
    }

    const wrapper = shallow(
      <ButtonGroup stacked>
        <FakeButton />
      </ButtonGroup>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
