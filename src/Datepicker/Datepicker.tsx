import React, { useCallback, useState, ReactElement, useEffect } from 'react';
import { DateUtils, DayModifiers, DayPickerInputProps, ModifiersUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';

import styles from '../Calendar/styles.module.scss';
import inputStyles from './stylesDayPickerInput.module.scss';
import { Icon } from '../Icon';
import * as Icons from './icons';
import {
  dateStringToPeriod,
  formatDate,
  formatPeriod,
  parseDate,
  PLACEHOLDER_DEFAULT,
  PLACEHOLDER_PERIOD,
  FORMAT_FORMDATA,
  formatPeriodFormdata,
  parseDateFromString,
} from '../utils/dates';

import { UniversalComponent as Arrow } from './components/UniversalComponent';
import { InputWrapper } from './InputWrapper';

export type DatepickerInputError = 'disabled' | 'early' | 'late' | 'format';

export type DatepickerProps = {
  value?: string;
  onChange?: (value?: string, error?: DatepickerInputError) => void;
  required?: boolean;
  format?: string;
  mask?: string;
  period?: boolean;
  inputComponent?: (props: any) => ReactElement;
  components?: {
    Arrow?: (props: any) => ReactElement;
  };
  inputProps?: {
    mask?: string;
    required?: boolean;
    iconName?: string;
    type?: string;
    ref?: React.MutableRefObject<HTMLInputElement | undefined>;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };

  modifiersClassNames?: {
    day?: string;
    selected?: string;
    outside?: string;
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
  | 'showOverlay'
>;

// Fix incomplete picker function signature
type SwitchMonthFunc = (callback?: () => void) => void;

const defaultComponents = { Arrow };

export const Datepicker = ({
  dayPickerProps,
  onChange,
  value,
  placeholder,
  format = FORMAT_FORMDATA,
  period,
  inputComponent: InputComponent,
  inputProps,
  components,
  modifiersClassNames,
  ...dayPickerInputProps
}: DatepickerProps) => {
  const { mask, required, iconName, type: inputType = 'text', onFocus, onBlur } = inputProps || {};
  let { ref: inputRef } = inputProps || {};
  inputRef = inputRef ?? React.useRef<HTMLInputElement>();
  const pickerRef = React.useRef<DayPickerInput>(null);

  const handleMonthPrev = useCallback(() => {
    const showPreviousMonth = pickerRef.current?.getDayPicker().showPreviousMonth as SwitchMonthFunc;
    // Go back two months if period mode is active and therefor two months are displayed at once

    showPreviousMonth(() => period && dayPickerProps?.numberOfMonths !== 1 && showPreviousMonth());
  }, [pickerRef, period, dayPickerProps]);

  const handleMonthNext = useCallback(() => {
    const showNextMonth = pickerRef.current?.getDayPicker().showNextMonth as SwitchMonthFunc;
    // Go forward two months if period mode is active and therefore two months are displayed at once
    showNextMonth(() => period && dayPickerProps?.numberOfMonths !== 1 && showNextMonth());
  }, [pickerRef, period, dayPickerProps]);

  const [range, setRange] = useState(dateStringToPeriod(value));
  const [currentDate, setCurrentDate] = useState<Date>(parseDateFromString(value));
  const { from, to } = range;
  const [modifiers, setModifiers] = useState({});

  useEffect(() => {
    let modifiers = {};

    if (modifiersClassNames?.day) {
      modifiers = {
        ...modifiers,
        [modifiersClassNames?.day]: () => true,
      };
    }

    if (period) {
      if (from) {
        modifiers = {
          ...modifiers,
          [modifiersClassNames?.selected || styles.selected]: from,
        };
      }

      if (to) {
        modifiers = {
          ...modifiers,
          [modifiersClassNames?.selected || styles.selected]: (day: Date) => DateUtils.isDayBetween(day, from, to),
          [modifiersClassNames?.range?.from || styles.start]: from,
          [modifiersClassNames?.range?.to || styles.end]: to,
        };
      }
    } else {
      if (currentDate) {
        modifiers = {
          ...modifiers,
          [modifiersClassNames?.selected || styles.selected]: currentDate,
        };
      }
    }

    setModifiers(modifiers);
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
    [range.from],
  );

  const props: DayPickerInputProps = {
    formatDate,
    format,
    parseDate: period ? handleParsePeriod : parseDate,
    placeholder: placeholder ? placeholder : period ? PLACEHOLDER_PERIOD : PLACEHOLDER_DEFAULT,
    component: InputWrapper,
    inputProps: {
      mask,
      required,
      InputComponent,
      onFocus,
      onBlur,
      iconName: iconName || 'Calendar',
      forwardedRef: inputRef,
      type: inputType,
    },
    hideOnDayClick: !period,
    classNames: inputStyles as any,
    ...dayPickerInputProps,

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

  const getError = useCallback(
    (day?: Date) => {
      const disabled = ModifiersUtils.dayMatchesModifier(day!, dayPickerProps?.disabledDays);
      if (!day || !disabled) {
        return undefined;
      }
      if (dayPickerProps?.fromMonth && day < dayPickerProps.fromMonth) {
        return 'early';
      }
      if (dayPickerProps?.toMonth && day > dayPickerProps.toMonth) {
        return 'late';
      }
      return 'disabled';
    },
    [dayPickerProps],
  );

  const handleDayChange = useCallback(
    (day: Date | undefined, DayModifiers: DayModifiers, dayPickerInput: DayPickerInput) => {
      setTimeout(() => {
        if (!day) {
          onChange?.(undefined, dayPickerInput.state.value && 'format');
          return;
        }
        pickerRef.current?.hideDayPicker();

        const value = formatDate(day, FORMAT_FORMDATA, locale);
        setCurrentDate(day);
        onChange?.(value, getError(day));
      }, 0);
    },
    [locale, onChange, getError],
  );

  const handleDayChangePeriod = useCallback(
    (day: Date | undefined) => {
      if (day == null) {
        if (from != null && to != null) {
          onChange?.(undefined);
          setRange({ from: null, to: null });
          setTimeout(() => inputRef?.current?.focus(), 0);
        }
        return;
      }
      if (!from && !to) {
        setRange({ from: day, to: undefined });
        onChange?.(formatPeriodFormdata(day, undefined), 'format');
        return;
      }

      const rangeToUse = from && to ? { from: undefined, to: undefined } : { from, to };
      const nextRange = DateUtils.addDayToRange(day, rangeToUse);
      setRange(nextRange);

      if (nextRange.from && nextRange.to) {
        pickerRef.current?.hideDayPicker();
        // fire onChange field value
        onChange?.(
          formatPeriodFormdata(nextRange.from, nextRange.to),
          getError(nextRange.from) ?? getError(nextRange.to),
        );
      } else {
        setTimeout(() => inputRef?.current?.focus(), 0);
      }
    },
    [pickerRef, from, to, onChange, inputRef],
  );

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
