import React, { FC } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type TextProps = {
  tag?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b' | 'strong' | 'i' | 'em' | 'li';
  size?: 'xlg' | 'lg' | 'sm' | 'xs' | 'inherit' | string;
  weight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 'bold'
    | 'semibold'
    | 'medium'
    | 'light'
    | 'regular';
  centered?: boolean;
  color?: 'inherit' | string;
  className?: string;
};

export const Text: FC<TextProps> = ({
  tag = 'p',
  size = 'inherit',
  weight = '400',
  color = 'inherit',
  centered,
  className,
  ...rest
}) => {
  const ComponentTag = tag;
  return (
    <ComponentTag
      className={cn(
        styles.text,
        styles[`text_size_${size}`],
        styles[`text_weight_${weight}`],
        styles[`text_color_${color}`],
        centered && styles.text_centered,
        className,
      )}
      {...rest}
    />
  );
};
