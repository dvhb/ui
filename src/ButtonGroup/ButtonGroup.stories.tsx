import React from 'react';
import { Field } from 'react-final-form';
import { action } from '@storybook/addon-actions';

import { FormDemo } from '../utils/forms';
import { ButtonGroup } from './ButtonGroup';
import { mockButtonGroupItems } from './__mock__';

export default {
  title: 'ButtonGroup',
  excludeStories: /.*Data$/,
};

const props = {
  onChange: action('onChange'),
};

const items = mockButtonGroupItems;

const value = items[0].value;

export const Default = () => <ButtonGroup {...props} items={items} />;

export const Block = () => <ButtonGroup {...props} items={items} block />;

export const WithValue = () => <ButtonGroup {...props} items={items} value={value} />;

export const WithForm = () => (
  <FormDemo initialValues={{ radioGroup: value }}>
    <Field name="radioGroup">
      {({ input }) => <ButtonGroup items={items} value={input.value} onChange={input.onChange} />}
    </Field>
    <br />
  </FormDemo>
);
