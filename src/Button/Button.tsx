import React from 'react';

import { ButtonProps } from './ButtonProps';

export const Button = ({ children, size, variant, block, className, ...props }: ButtonProps) => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};
