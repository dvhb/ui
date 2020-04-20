import React, { FC, HTMLAttributes } from 'react';

export type PropsButton = {
  type?: 'button' | 'reset' | 'submit';
  active?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const Button: FC = ({ ...rest }: PropsButton) => {
  return <button {...rest} />;
};
