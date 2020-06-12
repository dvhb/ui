import React, { ReactElement } from 'react';

import styles from './styles.module.scss';
import { UniversalComponentProps, UniversalComponent } from '../components/UniversalComponent';

export type RadioProps = {
  checked?: boolean;
  components?: {
    Radio?: (props: UniversalComponentProps) => ReactElement;
  };
};

const defaultComponents = {
  Radio: UniversalComponent,
};

export const Radio = ({ checked, components }: RadioProps) => {
  const { Radio } = { ...defaultComponents, ...components };

  return <Radio className={styles.radio}>{checked && <div className={styles.radio__pointer} />}</Radio>;
};
