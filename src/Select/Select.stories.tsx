import React from 'react';
import { action } from '@storybook/addon-actions';
import { Field } from 'react-final-form';

import { FormDemo } from '../utils/forms';
import { Select } from './Select';
import { mockOptionsSimple, mockOptionsGrouped } from './__mock__';

export default {
  title: 'Select',
  excludeStories: /.*Data$/,
};

const props = {
  options: mockOptionsSimple,
  onChange: action('onChange'),
};

const value = mockOptionsSimple[0];

export const Default = () => <Select {...props} />;

export const WithValue = () => <Select {...props} value={value} />;

export const WithError = () => <Select {...props} error />;

export const WithGroupedOptions = () => <Select {...props} isMulti options={mockOptionsGrouped} />;

export const DisabledClearIndicator = () => <Select {...props} clearIndicator={false} isMulti />;

export const WithForm = () => (
  <FormDemo initialValues={{ selectDefault: value, selectMulti: value }}>
    <Field name="selectDefault">
      {({ input }) => <Select {...props} value={input.value} onChange={input.onChange} />}
    </Field>
    <br />
    <Field name="selectMulti">
      {({ input }) => (
        <Select {...props} isMulti options={mockOptionsGrouped} value={input.value} onChange={input.onChange} />
      )}
    </Field>
  </FormDemo>
);

const loadOptions = (inputValue: string) =>
  new Promise(resolve => {
    setTimeout(() => {
      const options = mockOptionsSimple.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
      resolve(options);
    }, 2000);
  });

export const Async = () => {
  return <Select {...props} error cacheOptions defaultOptions loadOptions={loadOptions} />;
};
