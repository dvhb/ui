import React, { FC } from 'react';

import { Field } from '../Field';
import { Icon, IconNamesType } from '../Icon';
import { Input, InputProps } from '../Input';

export type InputWithIconProps = {
  iconName?: IconNamesType;
} & InputProps;

export const InputWithIcon: FC<InputWithIconProps> = ({ iconName, ...props }) => {
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
