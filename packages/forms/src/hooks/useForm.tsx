import { useContext } from 'react';
import FormContext from '../components/FormContext';
import { Context } from '../types';

export default function useForm(): Context {
  const form = useContext(FormContext);

  if (!form && __DEV__) {
    throw new Error('The `useForm` hook must be called within a `<Form />`.');
  }

  return form!;
}
