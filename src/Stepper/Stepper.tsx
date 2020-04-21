import React, { ReactElement, ReactNode, useCallback } from 'react';

import styles from './styles.module.scss';

import { StepperArrow, StepperCounter, StepperStep, StepperTitle } from './components';

export type StepProps = {
  title: string;
  [key: string]: any;
};

export type StepperStepComponentProps = {
  children: number | string | ReactNode;
  step: StepProps;
  key?: number | string;
  completed?: boolean;
  active?: boolean;
};

export type StepperProps = {
  steps: StepProps[];
  components?: {
    StepperCounter?: (props: StepperStepComponentProps) => ReactElement;
    StepperTitle?: (props: StepperStepComponentProps) => ReactElement;
    StepperArrow?: (props: StepperStepComponentProps) => ReactElement;
    StepperStep?: (props: StepperStepComponentProps & { onClick?: any }) => ReactElement;
  };
  activeStep?: number;
  onChangeActiveStep?: (index: number) => void;
  clickOnlyActiveStep?: boolean;
};

const defaultComponents = {
  StepperCounter,
  StepperTitle,
  StepperArrow,
  StepperStep,
};

export const Stepper = ({
  steps,
  components,
  activeStep = 0,
  onChangeActiveStep,
  clickOnlyActiveStep = true,
}: StepperProps) => {
  const { StepperCounter, StepperTitle, StepperArrow, StepperStep } = { ...defaultComponents, ...components };

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
        <StepperStep
          step={i}
          completed={index < activeStep}
          active={index === activeStep}
          onClick={onChangeActiveStepHandler(index)}
          key={index}
        >
          <StepperCounter step={i} completed={index < activeStep} active={index === activeStep}>
            {index + 1}
          </StepperCounter>
          <StepperTitle step={i} completed={index < activeStep} active={index === activeStep}>
            {i.title}
          </StepperTitle>
          {index < steps.length - 1 && (
            <StepperArrow step={i} completed={index < activeStep} active={index === activeStep}>
              >
            </StepperArrow>
          )}
        </StepperStep>
      ))}
    </div>
  );
};
