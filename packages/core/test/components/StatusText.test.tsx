import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import StatusText from '../../src/components/StatusText';
import { STATUSES } from '../../src/constants';

describe('<StatusText />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <StatusText danger success>
          Default
        </StatusText>,
      );
    }).toThrowError();
  });

  describe('statuses', () => {
    STATUSES.forEach(status => {
      it('renders text', () => {
        const wrapper = shallowWithStyles(
          shallowWithStyles(<StatusText {...{ [status]: true }}>{status}</StatusText>).getElement(),
        );

        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  it('can pass props to underlying `Text`', () => {
    const wrapper = shallowWithStyles(
      shallowWithStyles(
        <StatusText large muted>
          Text
        </StatusText>,
      ).getElement(),
    );

    expect(wrapper).toMatchSnapshot();
  });
});
