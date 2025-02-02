import { derived } from "svelte/store";

import {
  MessageFormatter,
  MessageObject,
  TimeFormatter,
  DateFormatter,
  NumberFormatter,
  JsonGetter,
  MessageObjectWithId,
} from '../types/index'
import { lookup } from '../includes/lookup'
import { hasLocaleQueue } from '../includes/loaderQueue'
import {
  getTimeFormatter,
  getDateFormatter,
  getNumberFormatter,
} from '../includes/formatters'
import { getOptions, getCurrentLocale, getPossibleLocales } from '../includes/utils';

import { $dictionary } from './dictionary'
import { $locale } from './locale'

export const formatMessage: MessageFormatter = (optionsOrId, maybeOptions= {}) => {
  const id = typeof optionsOrId === 'string' ? optionsOrId : optionsOrId.id;
  const options = typeof optionsOrId === 'string' ? maybeOptions : optionsOrId;

  const {
    values,
    locale = getCurrentLocale(),
    default: defaultValue,
  } = options;

  if (locale == null) {
    throw new Error(
      '[svelte-i18n] Cannot format a message without first setting the initial locale.',
    );
  }

  let message = lookup(id, locale);

  if (typeof message === 'string') {
    return message;
  }
  if (typeof message === 'function') {
    return message(...Object.keys(options.values || {}).sort().map(k => (options.values || {})[k]));
  }

  if (getOptions().warnOnMissingMessages) {
    // istanbul ignore next
    console.warn(
      `[svelte-i18n] The message "${id}" was not found in "${getPossibleLocales(
        locale,
      ).join('", "')}".${
        hasLocaleQueue(getCurrentLocale())
          ? `\n\nNote: there are at least one loader still registered to this locale that wasn't executed.`
          : ''
      }`,
    );
  }
  return defaultValue || id;
};

export const getJSON: JsonGetter = (id, locale) => {
  locale = locale || getCurrentLocale();
  return lookup(id, locale) || id;
}

export const formatTime: TimeFormatter = (t, options) =>
  getTimeFormatter(options).format(t)

export const formatDate: DateFormatter = (d, options) =>
  getDateFormatter(options).format(d)

export const formatNumber: NumberFormatter = (n, options) =>
  getNumberFormatter(options).format(n)

export const $format = /*@__PURE__*/derived([$locale, $dictionary], () => formatMessage);
export const $formatTime = /*@__PURE__*/derived([$locale], () => formatTime);
export const $formatDate = /*@__PURE__*/derived([$locale], () => formatDate);
export const $formatNumber = /*@__PURE__*/derived([$locale], () => formatNumber);
export const $getJSON = /*@__PURE__*/derived([$locale, $dictionary], () => getJSON);
