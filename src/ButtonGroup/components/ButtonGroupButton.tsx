import React, { FC, HTMLAttributes } from 'react';

export type ButtonGroupButtonProps = {
  type?: 'button' | 'reset' | 'submit';
  active?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const ButtonGroupButton: FC = ({ ...rest }: ButtonGroupButtonProps) => {
  return <button {...rest} />;
};
