import React, { ReactElement, ReactNode, useCallback } from 'react';

import styles from './styles.module.scss';

import { Counter } from './components/Counter';
import { Title } from './components/Title';
import { Arrow } from './components/Arrow';
import { Step } from './components/Step';

export type StepProps = {
  title: string;
  [key: string]: any;
};

export type ComponentCommonProps = {
  children: number | string | ReactNode;
  step: StepProps;
  key?: number | string;
  completed?: boolean;
  active?: boolean;
};

export type StepperProps = {
  steps: StepProps[];
  components?: {
    Counter?: (props: ComponentCommonProps) => ReactElement;
    Title?: (props: ComponentCommonProps) => ReactElement;
    Arrow?: (props: ComponentCommonProps) => ReactElement;
    Step?: (props: ComponentCommonProps & { onClick?: any }) => ReactElement;
  };
  activeStep?: number;
  onChangeActiveStep?: (index: number) => void;
  clickOnlyActiveStep?: boolean;
};

const defaultComponents = {
  Counter,
  Title,
  Arrow,
  Step,
};

export const Stepper = ({
  steps,
  components,
  activeStep = 0,
  onChangeActiveStep,
  clickOnlyActiveStep = true,
}: StepperProps) => {
  const { Counter, Title, Arrow, Step } = { ...defaultComponents, ...components };

  const onChangeActiveStepHandler = useCallback(
    index => () => {
      if (clickOnlyActiveStep) {
        if (index < activeStep) onChangeActiveStep?.(index);
      } else {
        onChangeActiveStep?.(index);
      }
    },
    [activeStep, clickOnlyActiveStep, onChangeActiveStep],
  );

  return (
    <div className={styles.stepper}>
      {steps.map((i, index) => (
        <Step
          step={i}
          completed={index < activeStep}
          active={index === activeStep}
          onClick={onChangeActiveStepHandler(index)}
          key={index}
        >
          <Counter step={i} completed={index < activeStep} active={index === activeStep}>
            {index + 1}
          </Counter>
          <Title step={i} completed={index < activeStep} active={index === activeStep}>
            {i.title}
          </Title>
          {index < steps.length - 1 && (
            <Arrow step={i} completed={index < activeStep} active={index === activeStep}>
              >
            </Arrow>
          )}
        </Step>
      ))}
    </div>
  );
};
