import {getSessionItem, setSessionItem} from './session-storage';

const id = 'factom.explorer.api-config';
const mockObject = {
    apiUrl: 'test',
    apiVersion: 'test',
    appId: 'test',
    appKey: 'test',
    blockchain: 'test',
};

test('getSessionItem should return true', () => {
    setSessionItem(id, mockObject);
    expect(getSessionItem(id)).toEqual(mockObject);
});
