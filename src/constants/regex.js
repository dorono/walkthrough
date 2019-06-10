/*
  REGEX Behavior:
  RAW: check for chars forbidden by XML 1.0 specifications, plus the unicode replacement character U+FFFD
*/
export const REGEX = {
    VALIDATE: {
        RAW: /[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g,
    },
    JSON: /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
};

Object.freeze(REGEX);
