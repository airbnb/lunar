import React from 'react';
import { shallow } from 'enzyme';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import StatusLabel from '../../src/components/StatusLabel';
import { STATUSES as BASE_STATUSES } from '../../src/constants';

const STATUSES = [...BASE_STATUSES, 'luxury', 'plus'];

describe('<StatusLabel />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallow(
        <StatusLabel danger success>
          Default
        </StatusLabel>,
      );
    }).toThrow();
  });

  it('renders a before icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = shallow(<StatusLabel beforeIcon={icon}>Default</StatusLabel>);

    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders a after icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = shallow(<StatusLabel afterIcon={icon}>Default</StatusLabel>);

    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders both icons', () => {
    const beforeIcon = <IconCheck decorative />;
    const afterIcon = <IconCheck decorative />;
    const wrapper = shallow(
      <StatusLabel beforeIcon={beforeIcon} afterIcon={afterIcon}>
        Default
      </StatusLabel>,
    );

    expect(wrapper.contains(beforeIcon)).toBe(true);
    expect(wrapper.contains(afterIcon)).toBe(true);
  });

  describe('statuses', () => {
    STATUSES.forEach((status) => {
      it('renders label', () => {
        const wrapper = shallow(<StatusLabel {...{ [status]: true }}>{status}</StatusLabel>);

        expect(wrapper.prop('className')).toMatch('label');
      });

      it('renders bordered', () => {
        const wrapper = shallow(
          <StatusLabel bordered {...{ [status]: true }}>
            {status}
          </StatusLabel>,
        );

        expect(wrapper.prop('className')).toMatch('label_bordered');
      });

      it('renders inverted state', () => {
        const wrapper = shallow(
          <StatusLabel inverted {...{ [status]: true }}>
            {status}
          </StatusLabel>,
        );

        expect(wrapper.prop('className')).toMatch('label_inverted');
      });

      it('renders uppercased state', () => {
        const wrapper = shallow(
          <StatusLabel uppercased {...{ [status]: true }}>
            {status}
          </StatusLabel>,
        );

        expect(wrapper.prop('className')).toMatch('label_uppercased');
      });
    });
  });
});
