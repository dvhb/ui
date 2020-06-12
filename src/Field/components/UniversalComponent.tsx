import React, { FC, HTMLAttributes } from 'react';

export type UniversalComponentProps = {} & HTMLAttributes<HTMLDivElement>;

export const UniversalComponent: FC = ({ ...rest }: UniversalComponentProps) => {
  return <div {...rest} />;
};
