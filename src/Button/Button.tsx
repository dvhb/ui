import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { Text } from '../Text';

export type ButtonProps = {
  variant?: 'unstyled' | 'black' | 'borderedBlack' | 'whiteBorderedBlack' | string;
  size?: 'lg';
  block?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, size, variant, block, className, style, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      style={style}
      className={cn(
        styles.button,
        variant && styles[`button_${variant}`],
        size === 'lg' && styles.buttonLg,
        block && styles.buttonBlock,
        className && className,
      )}
      {...rest}
    >
      <Text className={styles.button__text} color="inherit">
        {children}
      </Text>
    </button>
  );
}
