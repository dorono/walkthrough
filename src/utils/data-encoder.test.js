import getMultipleEncodings from './data-encoder';

const mockRawBase64 = 'VGVzdA==';
const mockRawExpectedReturn = {
    raw: 'Test',
    json: null,
    hex: null,
    base64: null,
};
const mockJSONBase64 = 'eyJ0ZXN0TnVtYmVyIjogOTk5fQ==';
const mockJSONExpectedReturn = {
    raw: '{"testNumber": 999}',
    json: '{"testNumber":999}',
    hex: null,
    base64: null,
};

const mockHexBase64 = '54657374';
const mockHexExpectedReturn = {
    raw: window.atob('54657374'),
    json: null,
    hex: 'e78eb9ef7ef8',
    base64: '54657374',
};

test('getMultipleEncodings should return true', () => {
    expect(getMultipleEncodings(mockRawBase64)).toEqual(mockRawExpectedReturn);
    expect(getMultipleEncodings(mockJSONBase64)).toEqual(mockJSONExpectedReturn);
    expect(getMultipleEncodings(mockHexBase64)).toEqual(mockHexExpectedReturn);
});
