import React from 'react';

export type UniversalComponentProps = {
  children?: any;
  className?: string;
};

export const UniversalComponent = ({ className, ...rest }: UniversalComponentProps) => {
  return <div className={className} {...rest} />;
};
