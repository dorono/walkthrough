import {notUndefined, stringNotNull, stringNotUndefined} from './validate';

test('notUndefined should return false if undefined', () => {
    expect(notUndefined(undefined)).toEqual(false);
    expect(notUndefined('test')).toEqual(true);
});

test('stringNotNull should return false if null', () => {
    expect(stringNotNull(null)).toEqual(false);
    expect(stringNotNull('test')).toEqual(true);
});

test('stringNotUndefined should return false if null', () => {
    expect(stringNotUndefined(undefined)).toEqual(false);
    expect(stringNotUndefined('test')).toEqual(true);
});
