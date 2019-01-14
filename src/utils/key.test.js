import {isKey, isPrivateKey, isProbablyAKey} from './key';

const mockPrivateKeyWithFs = 'Fs1KWJrpLdfucvmYwN2nWrwepLn8ercpMbzXshd1g8zyhKXLVLWj';
const mockPrivateKeyWithEs = 'Es2Rf7iM6PdsqfYCo3D1tnAR65SkLENyWJG1deUzpRMQmbh9F3eG';

const mockAddress = '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS';

const mockProbablyKeyWithFA = 'FA1KWJrpLdfucvmYwN2nWrwepLn8ercpMbzXshd1g8zyhKXLVLWk';
const mockProbablyKeyWithEC = 'EC1KWJrpLdfucvmYwN2nWrwepLn8ercpMbzXshd1g8zyhKXLVLWk';

test('isPrivateKey should return true', () => {
    expect(isPrivateKey(mockPrivateKeyWithEs)).toBe(true);
    expect(isPrivateKey(mockPrivateKeyWithFs)).toBe(true);
});

test('isKey should return true', () => {
    expect(isKey(mockAddress)).toBe(true);
});

test('isProbablyKey should return true', () => {
    expect(isProbablyAKey(mockProbablyKeyWithEC)).toBe(true);
    expect(isProbablyAKey(mockProbablyKeyWithFA)).toBe(true);
});
