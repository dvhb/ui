import React, { FC, ReactElement, useCallback } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { Text } from '../Text';
import {
  ButtonGroupButton,
  ButtonGroupButtonProps,
  ButtonGroupContainer,
  ButtonGroupContainerProps,
} from './components';

const defaultComponents = {
  ButtonGroupButton,
  ButtonGroupContainer,
};

export type ButtonGroupItem = {
  label: string;
  value?: any;
  [key: string]: object | any;
};

export type ButtonGroupProps = {
  items: ButtonGroupItem[];
  value?: any;
  type?: 'square' | 'round';
  size?: 'default' | 'lg';
  block?: boolean;
  valueProperty?: string;
  onChange?: (value: any) => void;
  components?: {
    ButtonGroupButton?: (props: ButtonGroupButtonProps) => ReactElement;
    ButtonGroupContainer?: (props: ButtonGroupContainerProps) => ReactElement;
  };
};

export const ButtonGroup: FC<ButtonGroupProps> = ({
  items,
  valueProperty = 'value',
  value,
  type = 'square',
  size,
  block,
  onChange,
  components,
}) => {
  const handleChange = useCallback(
    (item: ButtonGroupItem) => () => {
      onChange?.(item[valueProperty]);
    },
    [onChange, valueProperty],
  );

  const { ButtonGroupButton, ButtonGroupContainer } = { ...defaultComponents, ...components };

  return (
    <ButtonGroupContainer
      className={cn(
        type === 'square' && styles.containerSquare,
        type === 'round' && styles.containerRound,
        block && styles.container_block,
      )}
    >
      {items.map((item, index) => (
        <ButtonGroupButton
          type="button"
          onClick={handleChange(item)}
          className={cn(
            type === 'square' && styles.itemSquare,
            type === 'round' && styles.itemRound,
            item[valueProperty] === value && styles.itemActive,
            size && styles[`item_${size}`],
            block && styles.item_block,
          )}
          key={index}
          active={item[valueProperty] === value}
        >
          <Text weight="bold" color="inherit">
            {item.label || item[valueProperty]}
          </Text>
        </ButtonGroupButton>
      ))}
    </ButtonGroupContainer>
  );
};
