import React from 'react';
import { shallow } from 'enzyme';
import StatusText from '../../src/components/StatusText';
import { STATUSES } from '../../src/constants';

describe('<StatusText />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallow(
        <StatusText danger success>
          Default
        </StatusText>,
      ).dive();
    }).toThrowError();
  });

  describe('statuses', () => {
    STATUSES.forEach(status => {
      it('renders text', () => {
        const wrapper = shallow(<StatusText {...{ [status]: true }}>{status}</StatusText>)
          .dive()
          .dive()
          .dive();

        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  it('can pass props to underlying `Text`', () => {
    const wrapper = shallow(
      <StatusText large muted>
        Text
      </StatusText>,
    )
      .dive()
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });
});
