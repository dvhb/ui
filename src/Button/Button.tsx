import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, HTMLAttributes, ReactType } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type ButtonProps = {
  tag?: 'div' | 'button' | 'a' | 'span';
  variant?: 'default' | 'unstyled' | string;
  size?: 'default' | 'sm' | 'lg' | string;
  block?: boolean;
} & (
  | HTMLAttributes<HTMLDivElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
);

export const Button: FC<ButtonProps> = ({
  size = 'default',
  variant = 'default',
  block,
  className,
  tag = 'button',
  ...rest
}) => {
  const ComponentTag = tag as ReactType;

  return (
    <ComponentTag
      className={cn(
        styles.button,
        styles[`button_type_${variant}`],
        styles[`button_size_${size}`],
        block && styles.buttonBlock,
        className && className,
      )}
      {...rest}
    />
  );
};
