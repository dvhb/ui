import React, { FC, HTMLAttributes } from 'react';

export type ButtonGroupContainerProps = {} & HTMLAttributes<HTMLDivElement>;

export const ButtonGroupContainer: FC = ({ ...rest }: ButtonGroupContainerProps) => {
  return <div {...rest} />;
};
