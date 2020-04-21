import React, { FC, ReactNode } from 'react';
import styles from '../styles.module.scss';

export type CheckboxControlWrapperProps = {
  children?: ReactNode;
};

export const CheckboxControlWrapper: FC<CheckboxControlWrapperProps> = ({ children }) => {
  return <div className={styles.checkboxControlWrapper}>{children}</div>;
};
