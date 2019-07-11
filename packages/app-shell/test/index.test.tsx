import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { AppShell, Props, State } from '../src';

describe('AppShell', () => {
  let wrapper: Enzyme.ShallowWrapper<Props, State, AppShell>;
  let instance: AppShell;

  beforeEach(() => {
    wrapper = shallow<AppShell>(<AppShell name="Lunar">Child</AppShell>);
    instance = wrapper.instance();
  });

  describe('addBreadcrumb()', () => {
    it('adds a breadcrumb with a UUID', () => {
      expect(wrapper.state('breadcrumbs')).toEqual([]);

      instance.addBreadcrumb('Page Name', { href: '/foo' });

      expect(wrapper.state('breadcrumbs')).toEqual([
        {
          id: expect.anything(),
          label: 'Page Name',
          props: { href: '/foo' },
        },
      ]);
    });
  });

  describe('addPageData()', () => {
    it('adds page data with a UUID', () => {
      expect(wrapper.state('data')).toEqual({});

      instance.addPageData({
        foo: 'bar',
      });

      expect(wrapper.state('data')).not.toEqual({});
    });

    it('adds page data with a custom ID', () => {
      expect(wrapper.state('data')).toEqual({});

      instance.addPageData(
        {
          foo: 'bar',
        },
        'id',
      );

      expect(wrapper.state('data')).toEqual({
        id: { foo: 'bar' },
      });
    });
  });

  describe('addRefreshToast()', () => {
    it('adds a toast with refresh type', () => {
      expect(wrapper.state('toasts')).toEqual([]);

      instance.addRefreshToast('Something has refreshed');

      expect(wrapper.state('toasts')).toEqual([
        {
          id: expect.anything(),
          message: 'Something has refreshed',
          props: { duration: 0, refresh: true },
        },
      ]);
    });
  });

  describe('addInfoToast()', () => {
    it('adds a toast with info type', () => {
      expect(wrapper.state('toasts')).toEqual([]);

      instance.addInfoToast('This is informational', { duration: 1000 });

      expect(wrapper.state('toasts')).toEqual([
        {
          id: expect.anything(),
          message: 'This is informational',
          props: { duration: 1000, info: true },
        },
      ]);
    });
  });

  describe('addSuccessToast()', () => {
    it('adds a toast with success type', () => {
      expect(wrapper.state('toasts')).toEqual([]);

      instance.addSuccessToast('Data has saved', { delay: 1000 });

      expect(wrapper.state('toasts')).toEqual([
        {
          id: expect.anything(),
          message: 'Data has saved',
          props: { delay: 1000, success: true },
        },
      ]);
    });

    it('can specify id for toast', () => {
      expect(wrapper.state('toasts')).toEqual([]);

      instance.addSuccessToast('Data has saved', { delay: 1000, id: '123' });

      expect(wrapper.state('toasts')).toEqual([
        {
          id: '123',
          message: 'Data has saved',
          props: { delay: 1000, success: true, id: '123' },
        },
      ]);
    });

    it('adding a toast with an id that already exists replaces the toast', () => {
      expect(wrapper.state('toasts')).toEqual([]);

      instance.addSuccessToast('first', { delay: 1000, id: '123' });
      instance.addSuccessToast('second', { delay: 1000, id: '123' });

      expect(wrapper.state('toasts')).toEqual([
        {
          id: '123',
          message: 'second',
          props: { delay: 1000, success: true, id: '123' },
        },
      ]);
    });
  });

  describe('addFailureToast()', () => {
    it('adds a toast with failure type', () => {
      expect(wrapper.state('toasts')).toEqual([]);

      instance.addFailureToast('Data failed to save');

      expect(wrapper.state('toasts')).toEqual([
        {
          id: expect.anything(),
          message: 'Data failed to save',
          props: { danger: true },
        },
      ]);
    });
  });

  describe('removeBreadcrumb()', () => {
    it('it removes a toast', () => {
      expect(wrapper.state('breadcrumbs')).toHaveLength(0);

      const id = instance.addBreadcrumb('Page Name');

      expect(wrapper.state('breadcrumbs')).toHaveLength(1);

      instance.removeBreadcrumb(id);

      expect(wrapper.state('breadcrumbs')).toHaveLength(0);
    });
  });

  describe('removePageData()', () => {
    it('it removes page data by id', () => {
      expect(wrapper.state('data')).toEqual({});

      instance.addPageData({
        foo: 'bar',
      });

      expect(wrapper.state('data')).not.toEqual({});

      instance.removePageData(Object.keys(wrapper.state('data'))[0]);

      expect(wrapper.state('data')).toEqual({});
    });
  });

  describe('removeToast()', () => {
    it('it removes a toast', () => {
      expect(wrapper.state('toasts')).toHaveLength(0);

      instance.addFailureToast('Data failed to save');

      expect(wrapper.state('toasts')).toHaveLength(1);

      instance.removeToast(wrapper.state('toasts')[0].id);

      expect(wrapper.state('toasts')).toHaveLength(0);
    });
  });
});
