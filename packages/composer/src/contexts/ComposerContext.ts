import React from 'react';
import { Context } from '../types';
import { MODE_MESSAGE } from '../constants';

export const defaultContext: Context = {
  changeHandlers: new Set(),
  data: { focused: false, shadowValue: '', value: '' },
  flags: {},
  id: 'composer',
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
