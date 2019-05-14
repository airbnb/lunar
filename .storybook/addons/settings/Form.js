import React from 'react';
import { styled } from '@storybook/theming';
import { Form } from '@storybook/components';

const Field = styled.label({
  width: 200,
  display: 'flex',
  padding: '8px 15px',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Label = styled.span(({ theme }) => ({
  width: 80,
  fontWeight: theme.typography.weight.bold,
}));

export default function FormWrapper({ rtl, theme, onChangeRTL, onChangeTheme }) {
  return (
    <div>
      <Field>
        <Label>Theme</Label>

        <Form.Select value={theme} name="theme" onChange={onChangeTheme} size="flex">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Form.Select>
      </Field>

      <Field>
        <Label>RTL Mode</Label>

        <input checked={rtl} name="rtl" onChange={onChangeRTL} type="checkbox" />
      </Field>
    </div>
  );
}
