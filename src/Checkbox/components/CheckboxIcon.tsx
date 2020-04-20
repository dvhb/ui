import React, { ReactNode } from 'react';

import styles from '../styles.module.scss';

export type PropsCheckboxIcon = {
  children?: ReactNode;
};

export const CheckboxIcon = ({ children }: PropsCheckboxIcon) => {
  return <div className={styles.checkboxIcon}>{children}</div>;
};
