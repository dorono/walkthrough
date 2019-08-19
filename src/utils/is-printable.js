import xregexp from 'xregexp';

export const rawIsPrintable = value => xregexp('^\\PC+$').test(value);
