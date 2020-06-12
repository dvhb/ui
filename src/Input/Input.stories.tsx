import React from 'react';
import { action } from '@storybook/addon-actions';
import { Field } from 'react-final-form';

import { FormDemo } from '../utils/forms';
import { Input } from './Input';

export default {
  title: 'Input',
};

const props = {
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  onFocus: action('onFocus'),
};

export const Default = () => <Input {...props} />;

export const Required = () => <Input {...props} required />;

export const WithMask = () => <Input {...props} mask="99.99.9999" />;

export const WithMaskCharNull = () => <Input {...props} mask="+7 999 999-99-99" maskChar={null} />;

export const WithForm = () => (
  <FormDemo>
    <Field name="text">{({ input }) => <Input {...props} value={input.value} onChange={input.onChange} />}</Field>
    <br />
    <Field name="mask">
      {({ input }) => <Input {...props} value={input.value} onChange={input.onChange} mask="99.99.9999" />}
    </Field>
  </FormDemo>
);
