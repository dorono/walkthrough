import xregexp from 'xregexp';
import emojiRegex from 'emoji-regex';

export const rawIsPrintable = value => xregexp('^\\PC+$').test(value) || emojiRegex().test(value);
