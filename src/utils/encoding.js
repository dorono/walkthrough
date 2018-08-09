import createEncoderFromAlphabet from 'base-x';
import bs58check from 'bs58check';

const alphabetsByBase = {
    2: '01',
    8: '01234567',
    11: '0123456789a',
    32: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
    36: '0123456789abcdefghijklmnopqrstuvwxyz',
    58: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
    62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    66: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~',
};

const createEncoder = base => {
    const baseAlphabet = alphabetsByBase[base];
    if (!baseAlphabet) {
        throw new Error(`Alphabet not provided for base ${base}`);
    }
    return createEncoderFromAlphabet(baseAlphabet);
};

export const toHex = str => {
    let hexString = '';
    for (let i = 0; i < str.length; i++) {
        const hexByte = str.charCodeAt(i).toString(16);
        hexString += (hexByte.length === 2 ? hexByte : `0${hexByte}`);
    }
    return hexString.toUpperCase();
};

export const base58 = createEncoder(58);
export const base64 = createEncoder(64);
export const base58check = bs58check;

export default createEncoder;
