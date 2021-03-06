import {Base64} from 'js-base64';
import getMultipleEncodings from './data-encoder';

const mockRawBase64 = 'VGVzdA==';
const mockRawExpectedReturn = {
    raw: 'Test',
    json: undefined,
    hex: '54657374',
    base64: 'VGVzdA==',
};
const mockJSONBase64 = 'eyJ0ZXN0TnVtYmVyIjogOTk5fQ==';
const mockJSONExpectedReturn = {
    raw: '{"testNumber": 999}',
    json: '{"testNumber":999}',
    hex: '7b22746573744e756d626572223a203939397d',
    base64: 'eyJ0ZXN0TnVtYmVyIjogOTk5fQ==',
};

const mockHexBase64 = '54657374';
const mockHexExpectedReturn = {
    raw: Base64.decode('54657374'),
    json: undefined,
    hex: 'e78eb9ef7ef8',
    base64: '54657374',
};

test('getMultipleEncodings should return true', () => {
    expect(getMultipleEncodings(mockRawBase64)).toEqual(mockRawExpectedReturn);
    expect(getMultipleEncodings(mockJSONBase64)).toEqual(mockJSONExpectedReturn);
    expect(getMultipleEncodings(mockHexBase64)).toEqual(mockHexExpectedReturn);
});
