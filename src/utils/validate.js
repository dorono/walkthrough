import isUndefined from 'lodash/isUndefined';

export const stringNotNull = value =>
    !isUndefined(value) && typeof value === 'string' && value.length > 0;
