import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import InputMask from 'react-input-mask';

import styles from './styles.module.scss';

export type InputProps = {
  Component?: any;
  value?: unknown;
  placeholder?: string;
  size?: 'default' | 'lg' | 'xlg';
  className?: string;
  required?: boolean;
  forwardedRef?: any;
  readOnly?: boolean;
  mask?: string | string[] | RegExp[];
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  disabled?: boolean;
  type?: string;
  autocomplete?: string;
} & Pick<InputMask['props'], 'formatChars' | 'maskChar'>;

function InputBase({
  Component = 'input',
  placeholder,
  size = 'default',
  className,
  required,
  forwardedRef,
  mask,
  ...rest
}: InputProps) {
  const ref = useRef<HTMLInputElement>();
  let ComponentToUse = Component;
  let refProp: any = { ref };

  if (mask) {
    ComponentToUse = InputMask;
    refProp = {
      inputRef: (maskInputRef: HTMLInputElement) => (ref.current = maskInputRef),
    };
  }

  // Proxy to forwarded ref if present
  useEffect(() => {
    if (!ref.current || !forwardedRef) {
      return;
    }
    forwardedRef.current = ref.current.hasOwnProperty('getInputDOMNode')
      ? (ref.current as any).getInputDOMNode()
      : ref.current;
  }, [forwardedRef, ref]);

  return (
    <ComponentToUse
      placeholder={placeholder}
      className={cn(
        styles.input,
        className && className,
        required && styles[`_error`],
        size && styles[`input_${size}`],
      )}
      mask={mask}
      {...refProp}
      {...rest}
    />
  );
}

export const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => (
  <InputBase forwardedRef={ref} {...props} />
));
