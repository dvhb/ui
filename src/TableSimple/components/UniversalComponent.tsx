import React, { FC, HTMLAttributes } from 'react';

export type UniversalComponentProps = {
  tag?: 'div' | 'td' | 'th' | 'span';
} & HTMLAttributes<HTMLDivElement | HTMLTableHeaderCellElement>;

export const UniversalComponent: FC = ({ tag = 'div', ...rest }: UniversalComponentProps) => {
  const ComponentTag = tag;
  return <ComponentTag {...rest} />;
};
