import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Alert from '../../src/components/Alert';
import Spacing from '../../src/components/Spacing';
import { STATUSES as BASE_STATUSES } from '../../src/constants';

const STATUSES = [...BASE_STATUSES];

function unwrap(element: any): Enzyme.ShallowWrapper<any, any> {
  return unwrapHOCs(shallow(element), 'Alert', {}, { render: true });
}

describe('<Alert />', () => {
  it('renders title', () => {
    const title = 'Foo';
    const wrapper = unwrap(<Alert title={title} />);

    expect(wrapper.contains(title)).toBe(true);
  });

  it('renders close button', () => {
    const wrapper = shallow(<Alert title="Title" onClose={() => {}} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inline', () => {
    const wrapper = shallow(<Alert inline title="Title" />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders space between the title and content', () => {
    const content = 'Foo';
    const wrapper = unwrap(<Alert title="Title">{content}</Alert>);

    expect(wrapper.contains(content)).toBe(true);
    expect(wrapper.find(Spacing)).toHaveLength(1);
    expect(
      unwrapHOCs(wrapper.find(Spacing), 'Spacing', {}, { render: true }).contains(content),
    ).toBe(true);
  });

  describe('renders statuses', () => {
    STATUSES.forEach(status => {
      it(`renders ${status} alert`, () => {
        const wrapper = shallow(<Alert {...{ [status]: true }} title={status} />).dive();

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
