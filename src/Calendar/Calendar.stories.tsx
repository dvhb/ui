import React from 'react';

import { Calendar } from './Calendar';
import { CalendarBirthday } from './CalendarBirthday';
import { CalendarPeriod } from './CalendarPeriod';

export default {
  title: 'Calendar',
};

const props = {};

export const Default = () => <Calendar {...props} />;

export const Birthday = () => <CalendarBirthday {...props} />;

export const Period = () => <CalendarPeriod {...props} />;
export const PeriodWithValue = () => <CalendarPeriod {...props} value="2020-03-20/2020-04-03" />;

export const Locale = () => <Calendar locale="ru" />;
