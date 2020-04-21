import React from 'react';

import styles from '../styles.module.scss';
import { ComponentCommonProps } from '../Stepper';

export const Counter = (props: ComponentCommonProps) => <div className={styles.stepNumber} {...props} />;
