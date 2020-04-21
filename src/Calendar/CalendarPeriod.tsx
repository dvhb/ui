import React, { useCallback, useState } from 'react';
import { DateUtils, DayPickerProps } from 'react-day-picker';

import { dateStringToPeriod } from '../utils/dates';
import { Calendar, CalendarProps } from './Calendar';
import styles from './styles.module.scss';

export type CalendarPeriodProps = {
  value?: string;
} & CalendarProps;

/**
 * Based on http://react-day-picker.js.org/examples/selected-range
 */
export const CalendarPeriod = ({ value, ...props }: CalendarPeriodProps) => {
  const [range, setRange] = useState(dateStringToPeriod(value));
  const { from, to } = range;
  const modifiers = { [styles.start]: from, [styles.end]: to };

  const handleDayClick = useCallback(
    day => {
      const range = DateUtils.addDayToRange(day, { from, to });
      setRange(range);
    },
    [from, to],
  );

  const dayPickerProps = Object.assign(
    {
      modifiers,
      numberOfMonths: 2,
      showOutsideDays: false,
      selectedDays: [from, { from, to }],
      onDayClick: handleDayClick,
    } as DayPickerProps,
    props,
  );

  return <Calendar {...dayPickerProps} />;
};
