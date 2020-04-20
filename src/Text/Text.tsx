import React, { ReactNode } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type TextProps = {
  children?: string | ReactNode;
  type?: 'h1' | 'h2' | 'default' | 'lg' | 'sm' | 'md' | 'inherit';
  weight?: 'regular' | 'bold';
  color?: 'white' | 'grey' | 'greyDark' | 'purple' | 'link' | 'warning' | 'darker-warning' | 'red' | 'inherit';
  centered?: boolean;
  className?: string;
};

export function Text({ children, type, weight, color, centered, className }: TextProps) {
  const ComponentName = type === 'h1' ? 'h1' : 'div';

  return (
    <ComponentName
      className={cn(
        styles.text,
        color && styles[`text_${color}`],
        // TODO: make right size & type inherit
        type && type !== 'inherit' && styles[`text_${type}`],
        type === 'inherit' && styles.textSizeInherit,
        centered && styles.text_centered,
        weight && styles[`text_${weight}`],
        className,
      )}
    >
      {children}
    </ComponentName>
  );
}
