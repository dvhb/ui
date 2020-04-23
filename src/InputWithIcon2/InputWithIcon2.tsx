import React, { FC, ReactNode } from 'react';

import { Input, InputProps } from '../Input';
import { Field2 } from '../Field2';

export type InputWithIcon2Props = {
  icon?: ReactNode;
  iconClassName?: string;
} & InputProps;

export const InputWithIcon2: FC<InputWithIcon2Props> = ({ icon, iconClassName, ...props }) => {
  return (
    <Field2 asLabel bottomMargin={false}>
      <Input {...props} />
      {icon && <Field2.Helper className={iconClassName}>{icon}</Field2.Helper>}
    </Field2>
  );
};
