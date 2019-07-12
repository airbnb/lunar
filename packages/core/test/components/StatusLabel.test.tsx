import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import StatusLabel from '../../src/components/StatusLabel';
import { STATUSES as BASE_STATUSES } from '../../src/constants';

const STATUSES = [...BASE_STATUSES, 'luxury', 'plus'];

describe('<StatusLabel />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <StatusLabel danger success>
          Default
        </StatusLabel>,
      );
    }).toThrowError();
  });

  it('renders a before icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = shallowWithStyles(<StatusLabel beforeIcon={icon}>Default</StatusLabel>);

    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders a after icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = shallowWithStyles(<StatusLabel afterIcon={icon}>Default</StatusLabel>);

    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders both icons', () => {
    const beforeIcon = <IconCheck decorative />;
    const afterIcon = <IconCheck decorative />;
    const wrapper = shallowWithStyles(
      <StatusLabel beforeIcon={beforeIcon} afterIcon={afterIcon}>
        Default
      </StatusLabel>,
    );

    expect(wrapper.contains(beforeIcon)).toBe(true);
    expect(wrapper.contains(afterIcon)).toBe(true);
  });

  describe('statuses', () => {
    STATUSES.forEach(status => {
      it('renders label', () => {
        const wrapper = shallowWithStyles(
          <StatusLabel {...{ [status]: true }}>{status}</StatusLabel>,
        );

        expect(wrapper).toMatchSnapshot();
      });

      it('renders bordered', () => {
        const wrapper = shallowWithStyles(
          <StatusLabel bordered {...{ [status]: true }}>
            {status}
          </StatusLabel>,
        );

        expect(wrapper).toMatchSnapshot();
      });

      it('renders inverted state', () => {
        const wrapper = shallowWithStyles(
          <StatusLabel inverted {...{ [status]: true }}>
            {status}
          </StatusLabel>,
        );

        expect(wrapper).toMatchSnapshot();
      });

      it('renders uppercased state', () => {
        const wrapper = shallowWithStyles(
          <StatusLabel uppercased {...{ [status]: true }}>
            {status}
          </StatusLabel>,
        );

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
