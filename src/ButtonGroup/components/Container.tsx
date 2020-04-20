import React, { FC, HTMLAttributes } from 'react';

export type ContainerProps = {} & HTMLAttributes<HTMLDivElement>;

export const Container: FC = ({ ...rest }: ContainerProps) => {
  return <div {...rest} />;
};
