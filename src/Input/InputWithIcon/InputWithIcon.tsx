import React from 'react';

import { Field } from '../../Field';
import { Icon, IconNamesType } from '../../Icon';
import { Input, InputProps } from '../Input';

type Props = {
  iconName?: IconNamesType;
} & InputProps;

export const InputWithIcon = ({ iconName, ...props }: Props) => {
  return (
    <Field>
      <Input {...props} />
      {iconName && (
        <Field.Helper>
          <Icon name={iconName} />
        </Field.Helper>
      )}
    </Field>
  );
};
