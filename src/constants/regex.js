/*
  REGEX Behavior:
  RAW: check for chars forbidden by XML 1.0 specifications, plus the unicode replacement character U+FFFD
*/
export const REGEX = {
    VALIDATE: {
        HEX: null,
        RAW: /[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g,
        BASE64: null,
        JSON: null,
    },
};

Object.freeze(REGEX);
