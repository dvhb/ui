import React, { FC } from 'react';

import styles from '../styles.module.scss';
import { StepperStepComponentProps } from '../Stepper';

export type TitleComponentProps = {} & StepperStepComponentProps;

export const StepperTitle: FC<TitleComponentProps> = props => <div className={styles.stepTitle} {...props} />;
