import React, { FC, ReactNode } from 'react';

import styles from '../styles.module.scss';

export type CheckboxIconProps = {
  children?: ReactNode;
};

export const CheckboxIcon: FC<CheckboxIconProps> = ({ children }) => {
  return <div className={styles.checkboxIcon}>{children}</div>;
};
