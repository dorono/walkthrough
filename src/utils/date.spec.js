import moment from 'moment';
import {currentTimezone} from './date';

test('currentTimezone should contain UTC', () => {
    expect(currentTimezone()).toEqual(expect.stringMatching('UTC'));
});

test('currentTimezone should contain the correct offset', () => {
    const offset = moment().format('ZZ');
    expect(currentTimezone()).toEqual(`UTC${offset}`);
});
