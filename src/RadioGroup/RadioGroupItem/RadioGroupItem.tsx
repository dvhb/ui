import React, { FC, ReactElement, ReactNode, useCallback } from 'react';

import styles from './styles.module.scss';
import { Radio, RadioProps } from '../Radio/Radio';
import { UniversalComponentProps, UniversalComponent } from '../components/UniversalComponent';

export type RadioGroupItemProps = {
  name?: string;
  label?: string | ReactNode;
  checked?: boolean;
  value: string;
  onChange?: (value: string) => void;
  components?: {
    LabelWrapper?: (props: UniversalComponentProps & { checked?: boolean }) => ReactElement;
    Label?: (props: UniversalComponentProps & { checked?: boolean }) => ReactElement;
  };
} & Pick<RadioProps, 'components'>;

const defaultComponents = {
  LabelWrapper: UniversalComponent,
  Label: UniversalComponent,
};

export const RadioGroupItem: FC<RadioGroupItemProps> = ({ name, label, checked, value, onChange, components }) => {
  const { LabelWrapper, Label } = { ...defaultComponents, ...components };

  const handleChange = useCallback(
    (value: string) => () => {
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <LabelWrapper className={styles.labelWrapper} onClick={handleChange(value)} checked={checked}>
      <Radio components={components} checked={checked} />
      {label && (
        <>
          <div className={styles.labelSpacer} />
          {typeof label === 'string' ? (
            <Label className={styles.label} checked={checked}>
              {label}
            </Label>
          ) : (
            label
          )}
        </>
      )}
    </LabelWrapper>
  );
};
