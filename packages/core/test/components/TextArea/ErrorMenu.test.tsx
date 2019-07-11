import React from 'react';
import { shallow } from 'enzyme';
import ErrorMenu from '../../../src/components/TextArea/Proofreader/ErrorMenu';
import Interweave from '../../../src/components/Interweave';
import { Item } from '../../../src/components/Menu';
import Text from '../../../src/components/Text';

describe('<ErrorMenu />', () => {
  const error = {
    message: 'Possible typo',
    short_message: 'Typo',
    offset: 0,
    length: 1,
    replacements: ['foo'],
  };

  it('displays short message', () => {
    const wrapper = shallow(<ErrorMenu error={error} onReplaceText={() => {}} />);

    expect(wrapper.find(Interweave).prop('content')).toBe('Typo');
  });

  it('displays message if no short message', () => {
    const wrapper = shallow(
      <ErrorMenu error={{ ...error, short_message: '' }} onReplaceText={() => {}} />,
    );

    expect(wrapper.find(Interweave).prop('content')).toBe('Possible typo');
  });

  it('triggers `onReplaceText` when item is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ErrorMenu error={error} onReplaceText={spy} />);

    wrapper.find(Item).simulate('click');

    expect(spy).toHaveBeenCalledWith(error, 'foo');
  });

  it('shows a message when a replacement is a space', () => {
    const wrapper = shallow(
      <ErrorMenu error={{ ...error, replacements: [' '] }} onReplaceText={() => {}} />,
    );

    expect(
      wrapper
        .find(Item)
        .find(Text)
        .prop('children'),
    ).toBe('(Space)');
  });

  it('shows a message when a replacement is an empty string', () => {
    const wrapper = shallow(
      <ErrorMenu error={{ ...error, replacements: [''] }} onReplaceText={() => {}} />,
    );

    expect(
      wrapper
        .find(Item)
        .find(Text)
        .prop('children'),
    ).toBe('Delete');
  });
});
