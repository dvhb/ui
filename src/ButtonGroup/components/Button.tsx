import React, { FC, HTMLAttributes } from 'react';

export type ButtonProps = {
  type?: 'button' | 'reset' | 'submit';
  active?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const Button: FC = ({ ...rest }: ButtonProps) => {
  return <button {...rest} />;
};
