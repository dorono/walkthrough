import isUndefined from 'lodash/isUndefined';

export const stringNotNull = value =>
    !isUndefined(value) && typeof value === 'string' && value.length > 0;

export const stringNotUndefined = value =>
    !isUndefined(value) && typeof value === 'string' && value.length >= 0;

export const notUndefined = value => !isUndefined(value);
