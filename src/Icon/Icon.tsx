import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import * as Svg from './components';

export type IconNamesType = keyof typeof Svg;

export type Props = {
  name: IconNamesType;
  className?: string;
  size?: 'default' | 'inherit';
};

export const Icon = ({ name, className, size = 'default', ...rest }: Props) => {
  const capitalize = (s: IconNamesType) => {
    return s && s[0].toUpperCase() + s.slice(1);
  };

  // @ts-ignore
  const IconComponent = Svg[capitalize(name)];

  return (
    <div className={cn(styles.icon, styles[`icon_${size}`], className)}>
      {IconComponent && <IconComponent {...rest} />}
    </div>
  );
};
