import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import T from '../../src/components/Translate';
import IconButton from '../../src/components/IconButton';
import Pagination from '../../src/components/Pagination';

describe('<Pagination />', () => {
  const noop = () => {};
  const baseRequest = {
    page: 1,
    hasNext: false,
    hasPrev: false,
    fetching: false,
  };

  describe('the pagination component', () => {
    it('is not displayed if there is a not a next page or previous page of results', () => {
      const wrapper = shallowWithStyles(
        <Pagination {...baseRequest} onNext={noop} onPrevious={noop} />,
      );

      expect(wrapper.type()).toBeNull();
    });

    it('is displayed if there is a next page of results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(wrapper.find(IconButton)).toHaveLength(2);
    });

    it('is displayed if there is a previous page of results', () => {
      const request = {
        ...baseRequest,
        hasPrev: true,
        page: 2,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(wrapper.find(IconButton)).toHaveLength(2);
    });

    it('displays the page number', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        page: 3,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(wrapper.find(T).prop('pageNumber')).toBe(request.page);
    });

    it('displays the page count if bookends are enabled', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        page: 3,
      };

      const pageCount = 5;

      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={noop}
          onLast={noop}
          pageCount={pageCount}
          showBookends
        />,
      );

      expect(wrapper.find(T).prop('pageNumber')).toBe(request.page);
      expect(wrapper.find(T).prop('pageCount')).toBe(pageCount);
    });

    it('displays the page label', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        page: 3,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} pageLabel="Photo" />,
      );

      expect(wrapper.find(T).prop('pageLabel')).toBe('Photo');
    });
  });

  describe('the previous button', () => {
    it('is disabled when at the first page of results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        page: 1,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(
        wrapper
          .find(IconButton)
          .first()
          .prop('disabled'),
      ).toBe(true);
    });

    it('is disabled when fetching new results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        hasPrev: true,
        fetching: true,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(
        wrapper
          .find(IconButton)
          .first()
          .prop('disabled'),
      ).toBe(true);
    });

    it('calls the onPrevious function when the previous button is pressed', () => {
      const request = {
        ...baseRequest,
        hasPrev: true,
      };

      const onPrevious = jest.fn();
      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={onPrevious} />,
      );

      wrapper
        .find(IconButton)
        .first()
        .simulate('click');

      expect(onPrevious).toHaveBeenCalled();
    });

    it('is enabled when there is a previous page of results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        hasPrev: true,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(
        wrapper
          .find(IconButton)
          .first()
          .prop('disabled'),
      ).toBe(false);
    });
  });

  describe('the next button', () => {
    it('is disabled when at the last page of results', () => {
      const request = {
        ...baseRequest,
        hasNext: false,
        hasPrev: true,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(
        wrapper
          .find(IconButton)
          .last()
          .prop('disabled'),
      ).toBe(true);
    });

    it('is disabled when fetching new results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        hasPrev: true,
        fetching: true,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(
        wrapper
          .find(IconButton)
          .last()
          .prop('disabled'),
      ).toBe(true);
    });

    it('is enabled when there is a next page of results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(
        wrapper
          .find(IconButton)
          .last()
          .prop('disabled'),
      ).toBe(false);
    });

    it('calls the onNext function when the next button is pressed', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
      };

      const onNext = jest.fn();
      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={onNext} onPrevious={noop} />,
      );

      wrapper
        .find(IconButton)
        .last()
        .simulate('click');

      expect(onNext).toHaveBeenCalled();
    });
  });

  describe('the first page button', () => {
    it('is hidden when bookends are disabled', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(wrapper.find(IconButton)).toHaveLength(2);
    });

    it('is disabled when at the first page of results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
      };

      const pageCount = 5;

      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={noop}
          onLast={noop}
          pageCount={pageCount}
          showBookends
        />,
      );

      expect(
        wrapper
          .find(IconButton)
          .first()
          .prop('disabled'),
      ).toBe(true);
    });

    it('is disabled when fetching new results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        hasPrev: true,
        fetching: true,
      };

      const pageCount = 5;

      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={noop}
          onLast={noop}
          pageCount={pageCount}
          showBookends
        />,
      );

      expect(
        wrapper
          .find(IconButton)
          .first()
          .prop('disabled'),
      ).toBe(true);
    });

    it('calls the onFirst function when pressed', () => {
      const request = {
        ...baseRequest,
        hasPrev: true,
      };

      const pageCount = 5;

      const onFirst = jest.fn();
      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={onFirst}
          onLast={noop}
          pageCount={pageCount}
          showBookends
        />,
      );

      wrapper
        .find(IconButton)
        .first()
        .simulate('click');

      expect(onFirst).toHaveBeenCalled();
    });

    it('is enabled when on any page other than the first', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        hasPrev: true,
        page: 2,
      };

      const pageCount = 5;

      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={noop}
          onLast={noop}
          pageCount={pageCount}
          showBookends
        />,
      );

      expect(
        wrapper
          .find(IconButton)
          .first()
          .prop('disabled'),
      ).toBe(false);
    });
  });

  describe('the last page button', () => {
    it('is hidden when bookends are disabled', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
      };

      const wrapper = shallowWithStyles(
        <Pagination {...request} onNext={noop} onPrevious={noop} />,
      );

      expect(wrapper.find(IconButton)).toHaveLength(2);
    });

    it('is disabled when at the last page of results', () => {
      const pageCount = 5;
      const request = {
        ...baseRequest,
        hasNext: true,
        page: pageCount,
      };

      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={noop}
          onLast={noop}
          pageCount={pageCount}
          showBookends
        />,
      );

      expect(
        wrapper
          .find(IconButton)
          .last()
          .prop('disabled'),
      ).toBe(true);
    });

    it('is disabled when fetching new results', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        hasPrev: true,
        fetching: true,
      };

      const pageCount = 5;

      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={noop}
          onLast={noop}
          pageCount={pageCount}
          showBookends
        />,
      );

      expect(
        wrapper
          .find(IconButton)
          .last()
          .prop('disabled'),
      ).toBe(true);
    });

    it('calls the onLast function when pressed', () => {
      const request = {
        ...baseRequest,
        hasPrev: true,
      };

      const pageCount = 5;

      const onLast = jest.fn();
      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={noop}
          onLast={onLast}
          pageCount={pageCount}
          showBookends
        />,
      );

      wrapper
        .find(IconButton)
        .last()
        .simulate('click');

      expect(onLast).toHaveBeenCalled();
    });

    it('is enabled when on any page other than the last', () => {
      const request = {
        ...baseRequest,
        hasNext: true,
        hasPrev: true,
      };

      const pageCount = 5;

      const wrapper = shallowWithStyles(
        <Pagination
          {...request}
          onNext={noop}
          onPrevious={noop}
          onFirst={noop}
          onLast={noop}
          pageCount={pageCount}
          showBookends
        />,
      );

      expect(
        wrapper
          .find(IconButton)
          .last()
          .prop('disabled'),
      ).toBe(false);
    });
  });
});
