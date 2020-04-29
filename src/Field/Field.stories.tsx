import React from 'react';

import { Field } from './Field';

export default {
  title: 'Field',
};

const Label = ({ children }: any) => <div>{children} Any Text</div>;

export const Default = () => (
  <Field label="Field label" labelHint="hint" description="description" components={{ Label }}>
    Field
  </Field>
);
