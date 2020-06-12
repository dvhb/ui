import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type IconProps = {
  name: string;
  className?: string;
  size?: 'default' | 'inherit';
  svgs?: any;
};

export const Icon = ({ name, className, size = 'default', svgs = {}, ...rest }: IconProps) => {
  const capitalize = (s: string) => {
    return s && s[0].toUpperCase() + s.slice(1);
  };

  // @ts-ignore
  const IconComponent = svgs[capitalize(name)];

  return (
    <div className={cn(styles.icon, styles[`icon_${size}`], className)}>
      {IconComponent && <IconComponent {...rest} />}
    </div>
  );
};
