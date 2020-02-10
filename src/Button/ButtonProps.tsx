import { ReactNode } from 'react';

export type ButtonProps = {
  children?: ReactNode;
  variant?: 'unstyled' | 'asLink' | 'black' | 'borderedBlack' | 'whiteBorderedBlack';
  size?: 'lg';
  block?: boolean;
  disabled?: boolean;
  className?: string;
};

