import React, { ReactElement } from 'react';

import { RadioGroupItem, RadioGroupItemProps } from '../RadioGroupItem';

export type RadioGroupProps = {
  name?: string;
  children?: any;
  value?: string;
} & Pick<RadioGroupItemProps, 'onChange' | 'components'>;

export const RadioGroup = ({ children, name, value, onChange, components, ...rest }: RadioGroupProps) => {
  const renderChild = (child: ReactElement<RadioGroupItemProps>) => {
    const { value: childValue, components: childComponents } = child.props;
    return React.cloneElement(child, {
      onChange,
      components: { ...components, ...childComponents },
      checked: (value && childValue === value) || undefined,
    });
  };

  return <div {...rest}>{React.Children.map(children, renderChild)}</div>;
};

RadioGroup.Item = RadioGroupItem;
