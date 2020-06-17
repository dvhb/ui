import React from 'react';
import { action } from '@storybook/addon-actions';
import { Field } from 'react-final-form';

import { FormDemo } from '../utils/forms';
import { DatepickerPeriod } from './DatepickerPeriod';

export default {
  title: 'Datepicker/DatepickerPeriod',
};

const props = {
  onChange: action('onChange'),
};

const periodValue = '2020-03-20/2020-03-29';
const mask = '9999-99-99—9999-99-99';

export const Default = () => <DatepickerPeriod {...props} />;
export const WithValue = () => <DatepickerPeriod {...props} value={periodValue} />;

export const WithMask = () => <DatepickerPeriod inputProps={{ mask, maskChar: null }} />;

export const WithForm = () => (
  <FormDemo initialValues={{ datepickerPeriod1: periodValue }}>
    <Field name="datepickerPeriod1">
      {({ input }) => <DatepickerPeriod period value={input.value} onChange={input.onChange} />}
    </Field>
    <Field name="datepickerPeriod2">
      {({ input }) => <DatepickerPeriod period value={input.value} onChange={input.onChange} />}
    </Field>
  </FormDemo>
);

export const WithFormAndMask = () => (
  <FormDemo initialValues={{ datepickerPeriod1: periodValue }}>
    <Field name="datepickerPeriod1">
      {({ input }) => <DatepickerPeriod period value={input.value} onChange={input.onChange} />}
    </Field>
    <Field name="datepickerPeriod2">
      {({ input }) => <DatepickerPeriod period value={input.value} onChange={input.onChange} />}
    </Field>
  </FormDemo>
);
