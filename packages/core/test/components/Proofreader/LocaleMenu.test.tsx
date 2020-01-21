import React from 'react';
import { shallow } from 'enzyme';
import LocaleMenu from '../../../src/components/Proofreader/LocaleMenu';
import { Item, Separator } from '../../../src/components/Menu';
import Text from '../../../src/components/Text';

describe('<LocaleMenu />', () => {
  const autoLocale = {
    locale: 'auto',
    label: 'Auto-detect',
  };

  const noneLocale = {
    locale: 'none',
    label: 'None',
  };

  it('renders none item', () => {
    const wrapper = shallow(
      <LocaleMenu noneDefinition={noneLocale} selectedLocale="en-US" onSelectLocale={() => {}} />,
    );
    const item = wrapper.find(Item).at(0);

    expect(item.find(Text).prop('children')).toBe('None');
    expect(wrapper.find(Separator)).toHaveLength(1);
  });

  it('renders auto-detect item', () => {
    const wrapper = shallow(
      <LocaleMenu autoDefinition={autoLocale} selectedLocale="en-US" onSelectLocale={() => {}} />,
    );
    const item = wrapper.find(Item).at(0);

    expect(item.find(Text).prop('children')).toBe('Auto-detect');
    expect(wrapper.find(Separator)).toHaveLength(1);
  });

  it('renders some item', () => {
    const wrapper = shallow(<LocaleMenu selectedLocale="en-US" onSelectLocale={() => {}} />);
    const item = wrapper.find(Item).at(0);

    expect(item.find(Text).prop('children')).toBe('Català');
    expect(wrapper.find(Separator)).toHaveLength(0);
  });

  it('highlights selected locale', () => {
    const wrapper = shallow(<LocaleMenu selectedLocale="en-US" onSelectLocale={() => {}} />);
    const item = wrapper.findWhere(node => node.type() === Item && node.key() === 'en-US');

    expect(item.prop('highlighted')).toBe(true);
  });

  it('triggers `onSelectLocale` when none is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <LocaleMenu noneDefinition={noneLocale} selectedLocale="en-US" onSelectLocale={spy} />,
    );

    wrapper
      .find(Item)
      .at(0)
      .simulate('click');

    expect(spy).toHaveBeenCalledWith('none');
  });

  it('triggers `onSelectLocale` when auto-detect is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <LocaleMenu autoDefinition={autoLocale} selectedLocale="en-US" onSelectLocale={spy} />,
    );

    wrapper
      .find(Item)
      .at(0)
      .simulate('click');

    expect(spy).toHaveBeenCalledWith('auto');
  });

  it('triggers `onSelectLocale` when item is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<LocaleMenu selectedLocale="en-US" onSelectLocale={spy} />);

    wrapper
      .find(Item)
      .at(0)
      .simulate('click');

    expect(spy).toHaveBeenCalledWith('ca-ES');
  });
});
