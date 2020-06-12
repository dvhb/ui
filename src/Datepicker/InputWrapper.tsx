import React from 'react';
import { InputWithIcon } from '../InputWithIcon';

export class InputWrapper extends React.Component<any> {
  focus() {
    this.props.forwardedRef.current.focus();
  }

  render() {
    const { InputComponent, ...props } = this.props;
    return InputComponent ? <InputComponent {...props} /> : <InputWithIcon {...props} />;
  }
}
