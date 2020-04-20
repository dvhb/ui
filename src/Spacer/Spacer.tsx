import React, { ReactNode } from 'react';

const defaultConfig = {
  xxs: 4,
  xs: 8,
  sm: 12,
  default: 16,
  lg: 20,
  xlg: 32,
  none: 0,
};

export type SpacerProps = {
  margin?: string;
  marginRight?: string;
  config?: { [key: string]: number };
  children?: ReactNode;
};

export const Spacer = ({
  config = defaultConfig,
  margin = 'default',
  marginRight = 'none',
  children,
  ...rest
}: SpacerProps) => {
  const stylesObject = {
    marginBottom: config[margin],
    marginRight: config[marginRight],
  };

  return (
    <div style={stylesObject} {...rest}>
      {children}
    </div>
  );
};
