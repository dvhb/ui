import React from 'react';

import styles from '../styles.module.scss';
import { ComponentCommonProps } from '../Stepper';

export type StepComponentProps = {} & ComponentCommonProps;

export const Step = (props: StepComponentProps) => <div className={styles.step} {...props} />;
