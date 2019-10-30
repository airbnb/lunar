import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import StatusText from '../../src/components/StatusText';
import { STATUSES } from '../../src/constants';
import Text from '../../src/components/Text';

describe('<StatusText />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <StatusText danger success>
          Default
        </StatusText>,
      );
    }).toThrow();
  });

  describe('statuses', () => {
    STATUSES.forEach(status => {
      it(`renders ${status} text`, () => {
        const wrapper = shallowWithStyles(
          shallowWithStyles(<StatusText {...{ [status]: true }}>{status}</StatusText>).getElement(),
        );

        expect(wrapper.find('span').prop('className')).toMatch(`text_${status}`);
      });
    });
  });

  it('can pass props to underlying `Text`', () => {
    const wrapper = shallowWithStyles(
      <StatusText large muted>
        Text
      </StatusText>,
    );

    expect(wrapper.find(Text).prop('large')).toBe(true);
  });
});
