import React, { useCallback, useState } from 'react';

import { Calendar, CalendarProps } from './Calendar';
import { fromMonth, toMonth, YearMonthForm } from './components/YearMonthForm';

export type CalendarBirthdayProps = {} & CalendarProps;

export const CalendarBirthday = ({ ...rest }: CalendarBirthdayProps) => {
  const [month, setMonth] = useState(fromMonth);
  const handleYearMonthChange = useCallback(m => setMonth(m), []);

  // @ts-ignore
  const CaptionElement = ({ date, localeUtils, locale }) => (
    <YearMonthForm date={date} localeUtils={localeUtils} locale={locale} onChange={handleYearMonthChange} />
  );

  return <Calendar month={month} fromMonth={fromMonth} toMonth={toMonth} captionElement={CaptionElement} {...rest} />;
};
