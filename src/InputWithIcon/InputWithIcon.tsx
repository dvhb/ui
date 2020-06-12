import React, { FC, ReactNode } from 'react';

import { Field } from '../Field';
import { Icon } from '../Icon';
import { Input, InputProps } from '../Input';
import * as Icons from './icons';

export type InputWithIconProps = {
  iconName?: string;
  icon?: ReactNode;
} & InputProps;

export const InputWithIcon: FC<InputWithIconProps> = ({ iconName, icon, ...props }) => {
  return (
    <Field bottomMargin={false}>
      <Input {...props} />
      {(iconName || icon) && (
        <Field.Helper>{icon ? icon : iconName && <Icon svgs={Icons} name={iconName} />}</Field.Helper>
      )}
    </Field>
  );
};
