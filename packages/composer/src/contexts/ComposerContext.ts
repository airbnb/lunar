import React from 'react';
import { Context } from '../types';
import { MODE_MESSAGE } from '../constants';

export const defaultContext: Context = {
  changeHandlers: new Set(),
  data: { shadowValue: '', value: '' },
  flags: {},
  menu: '',
  mode: MODE_MESSAGE,
  onChange() {},
  onSubmit() {},
  setData() {},
  setError() {},
  setMenu() {},
  setMode() {},
  submitHandlers: new Set(),
};

export default React.createContext<Context>(defaultContext);
