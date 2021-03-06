import React, { FC, HTMLAttributes } from 'react';

export type UniversalComponentProps = { tag?: string } & HTMLAttributes<HTMLDivElement>;

export const UniversalComponent: FC = ({ tag = 'div', ...rest }: UniversalComponentProps) => {
  const ComponentTag = tag;

  return <ComponentTag {...rest} />;
};
