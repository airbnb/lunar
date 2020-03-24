import React from 'react';
import { shallow } from 'enzyme';
import TableRow from '../../../src/components/Table/Row';
import { STATUSES } from '../../../src/constants';

describe('<TableRow />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallow(
        <TableRow danger success>
          Default
        </TableRow>,
      );
    }).toThrow();
  });

  describe('statuses', () => {
    STATUSES.forEach((status) => {
      it('renders row', () => {
        const wrapper = shallow(<TableRow {...{ [status]: true }}>{status}</TableRow>);

        expect(wrapper.prop('className')).toMatch(`row_${status}`);
      });
    });
  });
});
