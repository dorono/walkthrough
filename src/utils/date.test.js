import moment from 'moment';
import {currentTimezone, formatDate, formatDateLong} from './date';

test('currentTimezone should contain UTC', () => {
    expect(currentTimezone()).toEqual(expect.stringMatching('UTC'));
});

test('currentTimezone should contain the correct offset', () => {
    const offset = moment().format('ZZ');
    expect(currentTimezone()).toEqual(`UTC${offset}`);
});

test('formatDate should contain the correct offset', () => {
    const offset = moment().format('YYYY-MM-DD HH:mm');
    expect(formatDate()).toEqual(`${offset}`);
});

test('formatDateLong should contain the correct offset', () => {
    const offset = moment().format('dddd, MMMM D, YYYY, HH:mm');
    expect(formatDateLong()).toEqual(`${offset}`);
});
