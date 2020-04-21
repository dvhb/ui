import React, { FC } from 'react';

import styles from '../styles.module.scss';
import { StepperStepComponentProps } from '../Stepper';

export type ArrowComponentProps = {} & StepperStepComponentProps;

export const StepperArrow: FC<ArrowComponentProps> = props => <div className={styles.stepNumber} {...props} />;
