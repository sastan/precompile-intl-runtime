interface Formats {
    number: Record<string, Intl.NumberFormatOptions>;
    date: Record<string, Intl.DateTimeFormatOptions>;
    time: Record<string, Intl.DateTimeFormatOptions>;
}
export interface DeepDictionary {
    [key: string]: DeepDictionary | string | string[];
}
export declare type LocaleDictionaryValue = string | ((...args: any[]) => string);
export declare type LocaleDictionary = Record<string, LocaleDictionaryValue>;
export declare type Dictionary = Record<string, LocaleDictionary>;
export interface MessageObject {
    locale?: string;
    format?: string;
    default?: string;
    values?: Record<string, string | number | Date>;
}
export interface MessageObjectWithId extends MessageObject {
    id: string;
}
export declare type JsonGetter = (id: string, locale?: string) => any;
export declare type MessageFormatter = (id: string | MessageObjectWithId, options?: MessageObject) => string;
export declare type TimeFormatter = (d: Date | number, options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>) => string;
export declare type DateFormatter = (d: Date | number, options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>) => string;
export declare type NumberFormatter = (d: number, options?: IntlFormatterOptions<Intl.NumberFormatOptions>) => string;
declare type IntlFormatterOptions<T> = T & {
    format?: string;
    locale?: string;
};
export interface MemoizedIntlFormatter<T, U> {
    (options?: IntlFormatterOptions<U>): T;
}
export interface MessagesLoader {
    (): Promise<any>;
}
export interface GetClientLocaleOptions {
    navigator?: boolean;
    hash?: string;
    search?: string;
    pathname?: RegExp;
    hostname?: RegExp;
}
export interface ConfigureOptions {
    fallbackLocale: string;
    initialLocale?: string;
    formats?: Partial<Formats>;
    loadingDelay?: number;
}
export {};
