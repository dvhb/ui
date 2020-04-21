import React, { FC } from 'react';

import styles from '../styles.module.scss';
import { StepperStepComponentProps } from '../Stepper';

export const StepperCounter: FC<StepperStepComponentProps> = props => <div className={styles.stepNumber} {...props} />;
