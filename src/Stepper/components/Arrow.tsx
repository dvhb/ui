import React from 'react';

import styles from '../styles.module.scss';
import { ComponentCommonProps } from '../Stepper';

export type ArrowComponentProps = {} & ComponentCommonProps;

export const Arrow = (props: ArrowComponentProps) => <div className={styles.stepNumber} {...props} />;
