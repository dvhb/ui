import React, { FC, HTMLAttributes } from 'react';

export type UniversalComponentProps = {} & HTMLAttributes<HTMLDivElement>;

export const UniversalComponent: FC<UniversalComponentProps> = ({ ...rest }) => {
  return <div {...rest} />;
};
