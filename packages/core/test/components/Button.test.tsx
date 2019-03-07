import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../src/components/Button';
import Loader from '../../src/components/Loader';

describe('<Button />', () => {
  it('can change `type` of button', () => {
    const wrapper = shallow(<Button type="submit">Button</Button>).dive();

    expect(wrapper.prop('type')).toBe('submit');
  });

  it('renders block', () => {
    const wrapper = shallow(<Button block>Button</Button>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders borderless', () => {
    const wrapper = shallow(<Button borderless>Button</Button>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const wrapper = shallow(<Button disabled>Button</Button>).dive();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('renders inverted', () => {
    const wrapper = shallow(<Button inverted>Button</Button>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallow(<Button large>Button</Button>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading', () => {
    const child = <div>Button</div>;
    const wrapper = shallow(<Button loading>{child}</Button>).dive();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Loader)).toHaveLength(1);
    expect(wrapper.contains(child)).toBe(false);
  });

  it('renders small', () => {
    const wrapper = shallow(<Button small>Button</Button>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading instead of icons', () => {
    const beforeIcon = <div>Icon</div>;
    const afterIcon = <div>Icon</div>;
    const wrapper = shallow(
      <Button loading beforeIcon={beforeIcon} afterIcon={afterIcon}>
        Default
      </Button>,
    ).dive();

    expect(wrapper.contains(beforeIcon)).toBe(false);
    expect(wrapper.contains(afterIcon)).toBe(false);
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('calls wrapped `onMouseUp`', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Button onMouseUp={spy}>Button</Button>).dive();

    wrapper.simulate('mouseup', {
      currentTarget: {
        blur() {},
      },
    });

    expect(spy).toHaveBeenCalled();
  });
});
