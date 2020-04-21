import React from 'react';
import { action } from '@storybook/addon-actions';
import { Field } from 'react-final-form';

import { FormDemo } from '../utils/forms';
import { Datepicker } from './Datepicker';

export default {
  title: 'Datepicker',
};

const props = {
  onChange: action('onChange'),
};

export const Default = () => <Datepicker {...props} />;
export const WithValue = () => <Datepicker {...props} value="2020-02-20" />;

export const WithForm = () => (
  <FormDemo initialValues={{ datepicker: '2020-03-20' }}>
    <Field name="datepicker">{({ input }) => <Datepicker value={input.value} onChange={input.onChange} />}</Field>
  </FormDemo>
);

export const WithFormAndMask = () => (
  <FormDemo initialValues={{ datepicker: '2020-03-20' }}>
    <Field name="datepicker">
      {({ input }) => <Datepicker mask="9999.99.99" value={input.value} onChange={input.onChange} />}
    </Field>
  </FormDemo>
);
