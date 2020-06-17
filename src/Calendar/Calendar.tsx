import React, { useCallback, useRef } from 'react';
import DayPicker, { DayPickerProps } from 'react-day-picker';

// Include the locale utils designed for moment
import MomentLocaleUtils from 'react-day-picker/moment';

import styles from './styles.module.scss';
import { Icon } from '../Icon';
import * as Icons from './icons';

export type CalendarProps = {} & DayPickerProps;

export const calendarProps = {
  localeUtils: MomentLocaleUtils,
  locale: 'en',
  classNames: styles as any,
  showOutsideDays: true,
  numberOfMonths: 1,
};

export const Calendar = (props: CalendarProps) => {
  const ref = useRef<DayPicker>(null);
  const handleMonthPrev = useCallback(() => ref.current?.showPreviousMonth(), [ref]);
  const handleMonthNext = useCallback(() => ref.current?.showNextMonth(), [ref]);

  const dayPickerProps: DayPickerProps = Object.assign(
    {
      ...calendarProps,
      navbarElement: () => (
        <div>
          <div className={styles.navButtonPrev} onClick={handleMonthPrev}>
            <Icon svgs={Icons} name="ArrowRight" />
          </div>
          <div className={styles.navButtonNext} onClick={handleMonthNext}>
            <Icon svgs={Icons} name="ArrowRight" />
          </div>
        </div>
      ),
    },
    props,
  );

  return <DayPicker ref={ref} {...dayPickerProps} />;
};
