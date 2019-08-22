import emojiRegex from 'emoji-regex';
import {REGEX} from '../constants/regex';

export const rawIsPrintable = value =>
  !REGEX.VALIDATE.NOT_PRINTABLE.test(value.replace(REGEX.FORMATTING_CHARS, ''))
  || emojiRegex().test(value);
