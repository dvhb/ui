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

const apiKey = '82392f053f6939bafa374832c31a66f3802dc049';
const headers = {
  Authorization: `Token ${apiKey}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const loadAddresses = async (inputValue: string) => {
  const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
    headers,
    method: 'POST',
    body: JSON.stringify({ query: inputValue, from_bound: { value: 'city' }, to_bound: { value: 'settlement' } }),
  });
  const data = await response.json();
  return data.suggestions.map((suggestion: any) => {
    console.dir(suggestion);
    return {
      label: suggestion.value,
      value: suggestion.data,
    };
  });
};

export const Address = () => {
  return <Select {...props} error cacheOptions loadOptions={loadAddresses} />;
};
