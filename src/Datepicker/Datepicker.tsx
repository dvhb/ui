import React, { useCallback, createRef, forwardRef, useState, ReactElement, useEffect } from 'react';
import { DateUtils, DayModifiers, DayPickerInputProps } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';

import styles from '../Calendar/styles.module.scss';
import inputStyles from './stylesDayPickerInput.module.scss';
import { Icon } from '../Icon';
import * as Icons from './icons';
import { InputWithIcon } from '../InputWithIcon';
import {
  dateStringToPeriod,
  formatDate,
  formatPeriod,
  parseDate,
  PLACEHOLDER_DEFAULT,
  PLACEHOLDER_PERIOD,
  FORMAT_FORMDATA,
  formatPeriodFormdata,
} from '../utils/dates';

import { UniversalComponent as Arrow } from './components/UniversalComponent';

export type DatepickerProps = {
  value?: string;
  onChange?: (value?: string) => void;
  required?: boolean;
  format?: string;
  mask?: string;
  period?: boolean;
  inputComponent?: (props: any) => ReactElement;
  components?: {
    Arrow?: (props: any) => ReactElement;
  };

  modifiersClassNames?: {
    selected?: string;
    range?: {
      from?: string;
      to?: string;
    };
  };
} & Pick<
  DayPickerInputProps,
  | 'dayPickerProps'
  | 'placeholder'
  | 'value'
  | 'formatDate'
  | 'parseDate'
  | 'hideOnDayClick'
  | 'onDayChange'
  | 'overlayComponent'
  | 'inputProps'
  | 'onDayPickerShow'
  | 'onDayPickerHide'
>;

// Fix incomplete picker function signature
type SwitchMonthFunc = (callback?: () => void) => void;

const defaultComponents = {
  Arrow,
};

export const Datepicker = ({
  dayPickerProps,
  required,
  onChange,
  value,
  placeholder,
  format = FORMAT_FORMDATA,
  period,
  inputComponent: InputComponent,
  mask,
  components,
  modifiersClassNames,
  ...dayPickerInpitProps
}: DatepickerProps) => {
  const pickerRef = createRef<DayPickerInput>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleMonthPrev = useCallback(() => {
    const showPreviousMonth = pickerRef.current?.getDayPicker().showPreviousMonth as SwitchMonthFunc;
    // Go back two months if period mode is active and therefor two months are displayed at once
    showPreviousMonth(() => period && showPreviousMonth());
  }, [pickerRef, period]);

  const handleMonthNext = useCallback(() => {
    const showNextMonth = pickerRef.current?.getDayPicker().showNextMonth as SwitchMonthFunc;
    // Go forward two months if period mode is active and therefore two months are displayed at once
    showNextMonth(() => period && showNextMonth());
  }, [pickerRef, period]);

  const [range, setRange] = useState(dateStringToPeriod(value));
  const [currentDate, setCurrentDate] = useState(value);
  const { from, to } = range;

  const [modifiers, setModifiers] = useState({});

  useEffect(() => {
    if (period) {
      if (from) {
        setModifiers({
          [modifiersClassNames?.selected || styles.selected]: from,
        });
      }

      if (to) {
        setModifiers({
          [modifiersClassNames?.selected || styles.selected]: (day: Date) => DateUtils.isDayBetween(day, from, to),
          [modifiersClassNames?.range?.from || styles.start]: from,
          [modifiersClassNames?.range?.to || styles.end]: to,
        });
      }
    } else {
      if (currentDate) {
        setModifiers({
          [modifiersClassNames?.selected || styles.selected]: currentDate,
        });
      }
    }
  }, [from, to, setModifiers, modifiersClassNames, currentDate, period]);

  const { Arrow } = { ...defaultComponents, ...components };

  const handleParsePeriod = useCallback(
    (value: string, format: string, locale: string) => {
      const [from, to] = value.split('—');

      if (range.from) {
        return parseDate(to, format, locale);
      }

      return parseDate(from, format, locale);
    },
    [range],
  );

  const props: DayPickerInputProps = {
    formatDate,
    format,
    parseDate: period ? handleParsePeriod : parseDate,
    placeholder: placeholder ? placeholder : period ? PLACEHOLDER_PERIOD : PLACEHOLDER_DEFAULT,
    component: forwardRef<DayPickerInput>((props, ref) =>
      InputComponent ? (
        <InputComponent forwardedRef={ref} {...props} />
      ) : (
        <InputWithIcon forwardedRef={ref} {...props} />
      ),
    ),
    inputProps: {
      mask,
      required,
      iconName: 'Calendar',
      ref: inputRef,
    },
    hideOnDayClick: !period,
    classNames: inputStyles as any,
    ...dayPickerInpitProps,

    // day picker props
    dayPickerProps: Object.assign(
      {
        modifiers,
        localeUtils: MomentLocaleUtils,
        locale: 'en',
        classNames: styles as any,
        showOutsideDays: !period,
        numberOfMonths: period ? 2 : 1,
        selectedDays: period && [from, { from, to }],
        navbarElement: (props: any) => {
          return (
            <div>
              {props.showPreviousButton && (
                <Arrow className={styles.navButtonPrev} onClick={handleMonthPrev}>
                  <Icon svgs={Icons} name="ArrowRight" />
                </Arrow>
              )}

              {props.showNextButton && (
                <Arrow className={styles.navButtonNext} onClick={handleMonthNext}>
                  <Icon svgs={Icons} name="ArrowRight" />
                </Arrow>
              )}
            </div>
          );
        },
      },
      dayPickerProps,
    ),
  };

  const locale = props.dayPickerProps?.locale;

  const handleDayChange = useCallback(
    (day: Date | undefined, modifiers: DayModifiers) => {
      if (!day || modifiers?.disabled) {
        return;
      }
      const value = formatDate(day, FORMAT_FORMDATA, locale);
      setCurrentDate(day.toString());
      onChange?.(value);
    },
    [locale, onChange],
  );

  const handleDayChangePeriod = useCallback(
    (day: any) => {
      // console.log('handleDayChangePeriod', day);
      if (day == null) {
        return;
      }
      const range = DateUtils.addDayToRange(day, { from, to });
      // console.log('setRange', range);
      setRange(range);

      if (range.from && range.to && !DateUtils.isSameDay(range.to, range.from)) {
        pickerRef.current?.hideDayPicker();

        // fire onChange field value
        onChange?.(formatPeriodFormdata(range.from, range.to));
      }
    },
    [pickerRef, from, to, onChange],
  );

  // console.log('');
  // console.log('value', value);
  // console.log('from', from);
  // console.log('to', to);

  return (
    <DayPickerInput
      ref={pickerRef}
      onDayChange={period ? handleDayChangePeriod : handleDayChange}
      value={
        period ? formatPeriod(from, to, format) : value ? parseDate(String(value), FORMAT_FORMDATA, locale) : undefined
      }
      {...props}
    />
  );
};
