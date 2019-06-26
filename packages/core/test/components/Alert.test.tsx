import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Alert from '../../src/components/Alert';
import Spacing from '../../src/components/Spacing';
import { STATUSES as BASE_STATUSES } from '../../src/constants';

const STATUSES = [...BASE_STATUSES];

describe('<Alert />', () => {
  it('renders title', () => {
    const title = 'Foo';
    const wrapper = shallowWithStyles(<Alert title={title} />);

    expect(wrapper.contains(title)).toBe(true);
  });

  it('renders close button', () => {
    const wrapper = shallowWithStyles(<Alert title="Title" onClose={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inline', () => {
    const wrapper = shallowWithStyles(<Alert inline title="Title" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders space between the title and content', () => {
    const content = 'Foo';
    const wrapper = shallowWithStyles(<Alert title="Title">{content}</Alert>);

    expect(wrapper.contains(content)).toBe(true);
    expect(wrapper.find(Spacing)).toHaveLength(1);
    expect(wrapper.find(Spacing).contains(content)).toBe(true);
  });

  describe('renders statuses', () => {
    STATUSES.forEach(status => {
      it(`renders ${status} alert`, () => {
        const wrapper = shallowWithStyles(<Alert {...{ [status]: true }} title={status} />);

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
