import React from 'react';
import { action } from '@storybook/addon-actions';
import { Field } from 'react-final-form';

import { FormDemo } from '../utils/forms';
import { InputWithIcon2, InputWithIcon2Props } from './InputWithIcon2';
import { Icon } from '../Icon';

export default {
  title: 'InputWithIcon2',
};

const props: InputWithIcon2Props = {
  icon: <Icon name="Calendar" />,
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  onFocus: action('onFocus'),
};

export const Default = () => <InputWithIcon2 {...props} />;

export const WithForm = () => (
  <FormDemo>
    <Field name="text">
      {({ input }) => <InputWithIcon2 {...props} value={input.value} onChange={input.onChange} />}
    </Field>
    <br />
    <Field name="mask">
      {({ input }) => <InputWithIcon2 {...props} value={input.value} onChange={input.onChange} />}
    </Field>
  </FormDemo>
);
