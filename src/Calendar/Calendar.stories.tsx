import React from 'react';

import { Calendar } from './Calendar';
import { CalendarBirthday } from './CalendarBirthday';
import { CalendarPeriod } from './CalendarPeriod';

import styles from './styles.module.scss';

export default {
  title: 'Calendar',
};

const props = {};

export const Default = () => <Calendar {...props} />;

export const Birthday = () => <CalendarBirthday {...props} />;

export const Period = () => <CalendarPeriod {...props} />;
export const CustomizedPeriod = () => (
  <CalendarPeriod
    rangeModifiersClassNames={{
      selected: styles.customSelected,
      from: styles.customRangeFrom,
      to: styles.customRangeTo,
    }}
    {...props}
  />
);
export const PeriodWithValue = () => <CalendarPeriod {...props} value="2020-03-20/2020-04-03" />;

export const Locale = () => <Calendar locale="ru" />;
