import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import TableRow from '../../../src/components/Table/Row';
import { STATUSES } from '../../../src/constants';

describe('<TableRow />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallowWithStyles(
        <TableRow danger success>
          Default
        </TableRow>,
      );
    }).toThrowError();
  });

  describe('statuses', () => {
    STATUSES.forEach(status => {
      it('renders row', () => {
        const wrapper = shallowWithStyles(<TableRow {...{ [status]: true }}>{status}</TableRow>);

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
