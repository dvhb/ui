import React, { ReactNode } from 'react';

export type PropsCheckboxControl = {
  children?: ReactNode;
  checked?: boolean;
  className?: string;
};

export const CheckboxControl = ({ children, checked, ...rest }: PropsCheckboxControl) => {
  return <div {...rest}>{children}</div>;
};
