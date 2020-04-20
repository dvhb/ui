import React, { ReactElement, useCallback } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { Text } from '../Text';
import { Button, ButtonProps } from './components/Button';
import { Container, ContainerProps } from './components/Container';
import { defaultComponents } from './components';

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
    Button?: (props: ButtonProps) => ReactElement;
    Container?: (props: ContainerProps) => ReactElement;
  };
};

export const ButtonGroup = ({
  items,
  valueProperty = 'value',
  value,
  type = 'square',
  size,
  block,
  onChange,
  components,
}: ButtonGroupProps) => {
  const handleChange = useCallback(
    (item: ButtonGroupItem) => () => {
      onChange?.(item[valueProperty]);
    },
    [onChange, valueProperty],
  );

  const { Button, Container } = { ...defaultComponents, ...components };

  return (
    <Container
      className={cn(
        type === 'square' && styles.containerSquare,
        type === 'round' && styles.containerRound,
        block && styles.container_block,
      )}
    >
      {items.map((item, index) => (
        <Button
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
        </Button>
      ))}
    </Container>
  );
};
