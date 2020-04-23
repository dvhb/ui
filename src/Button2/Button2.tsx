import React, { CSSProperties, FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type Button2Props = {
  children?: ReactNode;
  variant?: 'unstyled' | 'asLink' | 'black' | 'borderedBlack' | 'whiteBorderedBlack';
  size?: 'lg';
  block?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
};

export const Button2: FC<Button2Props> = ({ children, size, variant, block, className, style }) => {
  return (
    <button
      type="button"
      style={style}
      className={cn(
        styles.button,
        variant && styles[`button_${variant}`],
        size === 'lg' && styles.buttonLg,
        block && styles.buttonBlock,
        className && className,
      )}
    >
      {children}
    </button>
  );
};
