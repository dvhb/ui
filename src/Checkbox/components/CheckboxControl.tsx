import React, { FC, ReactNode } from 'react';

export type CheckboxControlProps = {
  children?: ReactNode;
  checked?: boolean;
  className?: string;
};

export const CheckboxControl: FC<CheckboxControlProps> = ({ children, checked, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
