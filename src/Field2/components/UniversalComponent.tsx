import React, { FC, HTMLAttributes } from 'react';

export type PropsUniversalComponent = {} & HTMLAttributes<HTMLDivElement>;

export const UniversalComponent: FC = ({ ...rest }: PropsUniversalComponent) => {
  return <div {...rest} />;
};
