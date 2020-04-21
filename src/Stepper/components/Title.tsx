import React from 'react';

import styles from '../styles.module.scss';
import { ComponentCommonProps } from '../Stepper';

export type TitleComponentProps = {} & ComponentCommonProps;

export const Title = (props: TitleComponentProps) => <div className={styles.stepTitle} {...props} />;
