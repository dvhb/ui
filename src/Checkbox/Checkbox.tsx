import React, { ReactElement, ReactNode, useCallback } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { Text } from '../Text';
import { Icon } from '../Icon';
import * as Icons from './icons';

import { CheckboxControl, CheckboxControlProps, CheckboxIcon, CheckboxIconProps } from './components';
import {
  UniversalComponentProps,
  UniversalComponent as CheckboxControlWrapper,
  UniversalComponent as Label,
} from './components/UniversalComponent';

export type CheckboxProps = {
  id?: string;
  label?: string | ReactNode;
  checked?: boolean;
  error?: boolean;
  disabled?: boolean; // @todo checkbox disabled not implemented
  components?: {
    CheckboxControl?: (props: CheckboxControlProps) => ReactElement;
    CheckboxControlWrapper?: (props: UniversalComponentProps) => ReactElement;
    CheckboxIcon?: (props: CheckboxIconProps) => ReactElement;
    Label?: (props: UniversalComponentProps) => ReactElement;
  };
  onChange?: (checked: boolean) => void;
  type?: 'default' | 'slider';
  dataCy?: string;
};

const defaultComponents = {
  CheckboxControl,
  CheckboxControlWrapper,
  CheckboxIcon,
  Label,
};

export const Checkbox = ({
  id,
  label,
  checked = false,
  error,
  disabled = false,
  onChange,
  components,
  dataCy,
}: CheckboxProps) => {
  const handleChange = useCallback(() => !disabled && onChange?.(!checked), [checked, disabled, onChange]);

  const { CheckboxControl, CheckboxIcon, CheckboxControlWrapper, Label } = { ...defaultComponents, ...components };

  return (
    <div id={id} className={styles.checkboxWrapper} onClick={handleChange}>
      <input className={styles.checkboxInput} type="checkbox" defaultChecked={checked} data-cy={dataCy} />
      <CheckboxControlWrapper className={styles.checkboxControlWrapper}>
        <CheckboxControl
          className={cn(
            styles.checkboxControl,
            checked && styles.checkboxControl_active,
            error && styles.checkboxControl_error,
          )}
          checked={checked}
        >
          {checked && (
            <CheckboxIcon>
              <Icon svgs={Icons} size="inherit" name="IconCheck" />
            </CheckboxIcon>
          )}
        </CheckboxControl>
      </CheckboxControlWrapper>
      {label && (
        <Label className={styles.checkboxLabel}>
          <Text tag="div">{label}</Text>
        </Label>
      )}
    </div>
  );
};
