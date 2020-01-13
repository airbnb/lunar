import React from 'react';
import { render } from 'rut-dom';
import Preview, { PreviewProps } from '../../src/components/Preview';
import Proofreader from '../../src/components/Preview/Proofreader';
import { Wrapper } from '../mocks';
import { MENU_PREVIEW } from '../../src/constants';

// eslint-disable-next-line unicorn/consistent-function-scoping
jest.mock('lodash/debounce', () => (cb: Function) => {
  return (...args: unknown[]) => cb(...args);
});

describe('<Preview />', () => {
  it('registers submit handlers when confirm is required', () => {
    const spy = jest.fn();

    render<PreviewProps>(<Preview requireConfirmation />, {
      wrapper: <Wrapper menu={MENU_PREVIEW} composerContext={{ onSubmit: spy }} />,
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('doesnt register submit handlers when confirm is optional', () => {
    const spy = jest.fn();

    render<PreviewProps>(<Preview />, {
      wrapper: <Wrapper menu={MENU_PREVIEW} composerContext={{ onSubmit: spy }} />,
    });

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('renders proofreader when `onProofread` is defined', () => {
    const { root, update } = render<PreviewProps>(<Preview />, {
      wrapper: <Wrapper menu={MENU_PREVIEW} />,
    });

    expect(root.find(Proofreader)).toHaveLength(0);

    update({
      onProofread: () => Promise.resolve([]),
    });

    expect(root.find(Proofreader)).toHaveLength(1);
  });

  it('confirms preview when send is clicked', () => {
    const spy = jest.fn();
    const { root } = render<PreviewProps>(<Preview />, {
      wrapper: <Wrapper menu={MENU_PREVIEW} composerContext={{ setData: spy }} />,
    });

    root.findOne('button').dispatch('onClick');

    expect(spy).toHaveBeenCalledWith('previewConfirmed', true);
  });
});
