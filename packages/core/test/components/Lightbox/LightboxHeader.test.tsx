import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../src/components/Button';
import Pagination from '../../../src/components/Pagination';
import LightboxHeader from '../../../src/components/Lightbox/LightboxHeader';

describe('<LightboxHeader />', () => {
  const onChangeSlideSpy = jest.fn();
  const onToggleAsideSpy = jest.fn();
  const props = {
    activeIndex: 0,
    imageCount: 5,
    onChangeSlide: onChangeSlideSpy,
    onToggleAside: onToggleAsideSpy,
  };

  it('renders a Pagination component', () => {
    const wrapper = shallow(<LightboxHeader {...props} />).dive();

    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  describe('renders a toggle info Button', () => {
    it('with "Hide Info" if hideAside is false', () => {
      const wrapper = shallow(<LightboxHeader {...props} hasAside />).dive();

      expect(
        wrapper
          .find(Button)
          .at(0)
          .prop('children'),
      ).toBe('Hide Info');
    });

    it('with "Show Info" if hideAside is true', () => {
      const wrapper = shallow(<LightboxHeader {...props} hasAside hideAside />).dive();

      expect(
        wrapper
          .find(Button)
          .at(0)
          .prop('children'),
      ).toBe('Show Info');
    });
  });
});
