import React from 'react';

export type PropsUniversalComponent = {
  children?: any;
  className?: string;
};

export const UniversalComponent = ({ className, ...rest }: PropsUniversalComponent) => {
  return <div className={className} {...rest} />;
};
