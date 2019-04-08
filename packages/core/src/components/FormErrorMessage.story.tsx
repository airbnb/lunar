import React from 'react';
import { storiesOf } from '@storybook/react';
import FormErrorMessage from './FormErrorMessage';

storiesOf('Core/FormErrorMessage', module).add(
  'An error message for an invalid form field.',
  () => <FormErrorMessage id="foo" error="This field is required!" />,
);
