import React from 'react';

import { Datepicker, DatepickerProps } from './Datepicker';

export type DatepickerPeriodProps = {} & DatepickerProps;

export const DatepickerPeriod = ({ ...props }: DatepickerPeriodProps) => {
  return <Datepicker period {...props} />;
};
