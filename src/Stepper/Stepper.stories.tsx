import { action } from '@storybook/addon-actions';
import React from 'react';

import { Stepper } from './Stepper';

export default {
  title: 'Stepper',
  excludeStories: /.*Data$/,
};

const stepperData = [
  {
    title: 'Информация о поездке',
  },
  {
    title: 'Дополнительные опции',
  },
  {
    title: 'Данные путешественников',
  },
  {
    title: 'Данные страхователя',
  },
  {
    title: 'Оплата',
  },
];

const props = {
  steps: stepperData,
  onChangeActiveStep: action('onChangeActiveStep'),
  activeStep: 1,
};

export const Default = () => <Stepper {...props} />;
