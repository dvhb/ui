import React from 'react';
import { action } from '@storybook/addon-actions';
import { Field } from 'react-final-form';

import { FormDemo } from '../utils/forms';
import { DatepickerBirthday } from './DatepickerBirthday';

export default {
  title: 'Datepicker/DatepickerBirthday',
};

const props = {
  onChange: action('onChange'),
};

const value = '1988-08-13';

export const Default = () => <DatepickerBirthday {...props} />;
export const WithValue = () => <DatepickerBirthday {...props} value={value} />;
export const WithLocale = () => <DatepickerBirthday dayPickerProps={{ locale: 'ru' }} {...props} />;

export const WithForm = () => (
  <FormDemo initialValues={{ datepickerBirthday: value }}>
    <Field name="datepickerBirthday">
      {({ input }) => <DatepickerBirthday value={input.value} onChange={input.onChange} />}
    </Field>
  </FormDemo>
);
