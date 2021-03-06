import React from 'react';
import { action } from '@storybook/addon-actions';
import { Field } from 'react-final-form';

import { FormDemo } from '../utils/forms';
import { InputWithIcon, InputWithIconProps } from './InputWithIcon';

export default {
  title: 'InputWithIcon',
};

const props: InputWithIconProps = {
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  onFocus: action('onFocus'),
};

export const Default = () => <InputWithIcon {...props} icon="X" />;

export const WithForm = () => (
  <FormDemo>
    <Field name="text">
      {({ input }) => <InputWithIcon icon="X" {...props} value={input.value} onChange={input.onChange} />}
    </Field>
    <br />
    <Field name="mask">
      {({ input }) => <InputWithIcon icon="X" {...props} value={input.value} onChange={input.onChange} />}
    </Field>
  </FormDemo>
);
