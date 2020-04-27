import React, { useCallback, useEffect, useState } from 'react';
import { DateUtils, DayPickerProps } from 'react-day-picker';

import { dateStringToPeriod } from '../utils/dates';
import { Calendar, CalendarProps } from './Calendar';
import styles from './styles.module.scss';

export type CalendarPeriodProps = {
  value?: string;
  rangeModifiersClassNames?: {
    from?: string;
    to?: string;
    selected?: string;
  };
} & CalendarProps;

/**
 * Based on http://react-day-picker.js.org/examples/selected-range
 */
export const CalendarPeriod = ({ value, rangeModifiersClassNames, ...props }: CalendarPeriodProps) => {
  const [range, setRange] = useState(dateStringToPeriod(value));
  const { from, to } = range;

  const [modifiers, setModifiers] = useState({});

  useEffect(() => {
    if (from) {
      setModifiers({
        [rangeModifiersClassNames?.selected || styles.selected]: from,
      });
    }

    if (to) {
      setModifiers({
        [rangeModifiersClassNames?.selected || styles.selected]: (day: Date) => DateUtils.isDayBetween(day, from, to),
        [rangeModifiersClassNames?.from || styles.start]: from,
        [rangeModifiersClassNames?.to || styles.end]: to,
      });
    }
  }, [from, to, setModifiers, rangeModifiersClassNames]);

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
