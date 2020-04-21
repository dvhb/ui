import React, { FC } from 'react';

import styles from '../styles.module.scss';
import { StepperStepComponentProps } from '../Stepper';

export type StepComponentProps = {} & StepperStepComponentProps;

export const StepperStep: FC<StepComponentProps> = props => <div className={styles.step} {...props} />;
