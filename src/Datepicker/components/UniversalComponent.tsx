import React from 'react';

export type UniversalComponentProps = {
  children?: any;
  className?: string;
  onClick?: () => void;
};

export const UniversalComponent = ({ className, ...rest }: UniversalComponentProps) => {
  return <div className={className} {...rest} />;
};
