import React, { useCallback, useState } from 'react';

import { Datepicker, DatepickerProps } from './Datepicker';
import { fromMonth, toMonth, YearMonthForm } from '../Calendar';

export type DatepickerBirthdayProps = {} & DatepickerProps;

export const DatepickerBirthday = ({ dayPickerProps, ...props }: DatepickerBirthdayProps) => {
  const [month, setMonth] = useState(toMonth);
  const handleYearMonthChange = useCallback(m => setMonth(m), []);

  // @ts-ignore
  const CaptionElement = ({ date, localeUtils, locale }) => (
    <YearMonthForm date={date} localeUtils={localeUtils} locale={locale} onChange={handleYearMonthChange} />
  );

  const disabledDays = { after: toMonth };

  return (
    <Datepicker
      dayPickerProps={Object.assign(
        {
          month,
          fromMonth,
          toMonth,
          disabledDays,
          captionElement: CaptionElement,
        },
        dayPickerProps,
      )}
      {...props}
    />
  );
};
