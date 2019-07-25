import {Base64} from 'js-base64';
import {REGEX} from '../constants/regex';

export const rawIsPrintable = value => {
    // check for non-utf-8 characters
    if (REGEX.VALIDATE.RAW.test(value)) {
        // if there are non-utf-8 chars, encode into a string...
        const encodedVal = Base64.encode(value);
        // ...now test for non-utf-8 w/a proper unicode string
        return !REGEX.VALIDATE.RAW.test(encodedVal);
    }
    // no non-utf-8 chars found, so it's printable!
    return true;
};
