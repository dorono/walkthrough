import {REGEX} from '../constants/regex';

export const rawIsPrintable = value => !REGEX.VALIDATE.RAW.test(value);
