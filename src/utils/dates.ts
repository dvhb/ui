// @ts-ignore
import { formatDate, parseDate } from 'react-day-picker/moment';

const PLACEHOLDER_DEFAULT = 'YYYY-MM-DD';
const PLACEHOLDER_PERIOD = 'YYYY-MM-DD—YYYY-MM-DD';
const FORMAT_FORMDATA = 'YYYY-MM-DD';

export const parseDateFromString = (value?: string, locale?: string): any => {
  return parseDate(value, FORMAT_FORMDATA, locale);
};

export const dateStringToPeriod = (value?: string, locale?: string): any => {
  const range = {
    from: undefined,
    to: undefined,
  };

  if (!value) return range;

  const [from, to] = value.split('/');
  return {
    from: parseDate(from, FORMAT_FORMDATA, locale),
    to: parseDate(to, FORMAT_FORMDATA, locale),
  };
};

const formatPeriod = (from?: Date, to?: Date, format?: string, locale?: string): string | undefined => {
  if (!from || !to) return undefined;
  return `${formatDate(from, format, locale)}—${formatDate(to, format, locale)}`;
};

const formatPeriodFormdata = (from?: Date, to?: Date): string | undefined => {
  if (!from || !to) return undefined;
  return `${formatDate(from, FORMAT_FORMDATA)}/${formatDate(to, FORMAT_FORMDATA)}`;
};

export {
  parseDate,
  formatDate,
  formatPeriod,
  formatPeriodFormdata,
  FORMAT_FORMDATA,
  PLACEHOLDER_DEFAULT,
  PLACEHOLDER_PERIOD,
};
