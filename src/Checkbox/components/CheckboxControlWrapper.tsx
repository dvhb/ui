import React, { ReactNode } from 'react';
import styles from '../styles.module.scss';

export type PropsCheckboxControlWrapper = {
  children?: ReactNode;
};

export const CheckboxControlWrapper = ({ children }: PropsCheckboxControlWrapper) => {
  return <div className={styles.checkboxControlWrapper}>{children}</div>;
};
