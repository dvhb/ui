import React from 'react';
import { action } from '@storybook/addon-actions';
import { Field } from 'react-final-form';

import { FormDemo } from '../utils/forms';
import { Checkbox } from './Checkbox';

export default {
  title: 'Checkbox',
};

const props = {
  label: 'Checkbox',
  onChange: action('onChange'),
};

export const Off = () => <Checkbox {...props} />;
export const OffWithDisabled = () => <Checkbox {...props} disabled />;

export const On = () => <Checkbox {...props} checked />;
export const OnWithDisabled = () => <Checkbox {...props} checked disabled />;

export const Error = () => <Checkbox {...props} error />;
export const ErrorWithValue = () => <Checkbox {...props} error checked />;

export const WithForm = () => (
  <FormDemo initialValues={{ checkbox: true }}>
    <Field name="checkbox">
      {({ input }) => <Checkbox label="Checkbox label" checked={input.value} onChange={input.onChange} />}
    </Field>
    <Field name="checkboxError">
      {({ input }) => <Checkbox label="Checkbox with error" error checked={input.value} onChange={input.onChange} />}
    </Field>
    <Field name="checkboxDisabled">
      {({ input }) => <Checkbox label="Checkbox disabled" disabled checked={input.value} onChange={input.onChange} />}
    </Field>
  </FormDemo>
);
