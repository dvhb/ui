import React, { useCallback } from 'react';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

export const fromMonth = new Date(currentYear - 100, 1);
export const toMonth = new Date(currentYear, currentMonth);

export type YearMonthFormProps = {
  date: any;
  localeUtils: any;
  locale: string;
  onChange: any;
};

export const YearMonthForm = ({ date, localeUtils, onChange, locale }: YearMonthFormProps) => {
  const months =
    date.getFullYear() === toMonth.getFullYear()
      ? localeUtils.getMonths(locale).filter((month: string, idx: number) => idx <= toMonth.getMonth())
      : localeUtils.getMonths(locale);

  const years = [];
  for (let i = toMonth.getFullYear(); i >= fromMonth.getFullYear(); i -= 1) {
    years.push(i);
  }

  const handleChangeMonth = useCallback(
    (e: any) => {
      const month = e.target.value;
      const year = date.getFullYear();
      if (new Date(year, month) > toMonth) {
        onChange(new Date(year, toMonth.getMonth()));
      } else {
        onChange(new Date(year, month));
      }
    },
    [onChange, date],
  );
  const handleChangeYear = useCallback(
    (e: any) => {
      const month = date.getMonth();
      const year = e.target.value;
      if (new Date(year, month) > toMonth) {
        onChange(new Date(year, toMonth.getMonth()));
      } else {
        onChange(new Date(year, month));
      }
    },
    [onChange, date],
  );

  return (
    <>
      <select name="month" onChange={handleChangeMonth} value={date.getMonth()}>
        {months.map((month: any, i: number) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChangeYear} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
};
