import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, HTMLAttributes, ReactType } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type ButtonProps = {
  tag?: 'div' | 'button' | 'a' | 'span';
  type?: 'default' | 'unstyled' | string;
  size?: 'default' | 'sm' | 'lg' | string;
  htmlType?: 'submit' | 'reset' | 'button';
  block?: boolean;
} & (
  | HTMLAttributes<HTMLDivElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
);

export const Button: FC<ButtonProps> = ({
  size = 'default',
  type = 'default',
  block,
  className,
  htmlType = 'submit',
  tag = 'button',
  ...rest
}) => {
  const ComponentTag = tag as ReactType;
  let attributes = {};

  if (tag === 'button') attributes = { type: htmlType };

  return (
    <ComponentTag
      className={cn(
        styles.button,
        styles[`button_type_${type}`],
        styles[`button_size_${size}`],
        block && styles.buttonBlock,
        className && className,
      )}
      {...attributes}
      {...rest}
    />
  );
};
