import React from 'react';
import { shallow } from 'enzyme';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import Alert from '../../src/components/Alert';
import Spacing from '../../src/components/Spacing';
import { STATUSES as BASE_STATUSES } from '../../src/constants';
import Row from '../../src/components/Row';

const STATUSES = [...BASE_STATUSES];

describe('<Alert />', () => {
  it('renders title', () => {
    const title = 'Foo';
    const wrapper = shallow(<Alert title={title} />);

    expect(wrapper.contains(title)).toBe(true);
  });

  it('renders close button', () => {
    const wrapper = shallow(<Alert title="Title" onClose={() => {}} />);

    // @ts-ignore
    expect(shallow(wrapper.find(Row).prop('after')).find(IconClose)).toHaveLength(1);
  });

  it('renders inline', () => {
    const wrapper = shallow(<Alert inline title="Title" />);

    expect(wrapper.prop('className')).toMatch('alert_inline');
  });

  it('renders space between the title and content', () => {
    const content = 'Foo';
    const wrapper = shallow(<Alert title="Title">{content}</Alert>);

    expect(wrapper.contains(content)).toBe(true);
    expect(wrapper.find(Spacing)).toHaveLength(1);
    expect(wrapper.find(Spacing).contains(content)).toBe(true);
  });

  describe('renders statuses', () => {
    STATUSES.forEach((status) => {
      it(`renders ${status} alert`, () => {
        const wrapper = shallow(<Alert {...{ [status]: true }} title={status} />);

        // eslint-disable-next-line jest/no-if
        if (status === 'muted') {
          expect(wrapper.prop('className')).toBe('alert');
        } else {
          expect(wrapper.prop('className')).toMatch(`alert_${status}`);
        }
      });
    });
  });
});
