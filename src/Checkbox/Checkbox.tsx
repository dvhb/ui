import React, { ReactElement, ReactNode, useCallback } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { Text } from '../Text';
import { Icon } from '../Icon';

import {
  CheckboxControl,
  CheckboxControlProps,
  CheckboxControlWrapper,
  CheckboxControlWrapperProps,
  CheckboxIcon,
  CheckboxIconProps,
} from './components';

export type CheckboxProps = {
  id?: string;
  label?: string | ReactNode;
  checked?: boolean;
  error?: boolean;
  disabled?: boolean; // @todo checkbox disabled not implemented
  components?: {
    CheckboxControl?: (props: CheckboxControlProps) => ReactElement;
    CheckboxControlWrapper?: (props: CheckboxControlWrapperProps) => ReactElement;
    CheckboxIcon?: (props: CheckboxIconProps) => ReactElement;
  };
  onChange?: (checked: boolean) => void;
};

const defaultComponents = {
  CheckboxControl,
  CheckboxControlWrapper,
  CheckboxIcon,
};

export const Checkbox = ({
  id,
  label,
  checked = false,
  error,
  disabled = false,
  onChange,
  components,
}: CheckboxProps) => {
  const handleChange = useCallback(() => onChange?.(!checked), [checked, onChange]);

  const { CheckboxControl, CheckboxIcon, CheckboxControlWrapper } = { ...defaultComponents, ...components };

  return (
    <div id={id} className={styles.checkboxWrapper} onClick={handleChange}>
      <input className={styles.checkboxInput} type="checkbox" defaultChecked={checked} />
      <CheckboxControlWrapper>
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
              <Icon size="inherit" name="Check" />
            </CheckboxIcon>
          )}
        </CheckboxControl>
      </CheckboxControlWrapper>
      {label && (
        <div className={styles.checkboxLabel}>
          <Text>{label}</Text>
        </div>
      )}
    </div>
  );
};
