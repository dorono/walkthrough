import {base58check} from 'utils/encoding';

/**
 * Decode a given value from base58check.
 * If valueToDecode is valid, returns the decoded value.
 * Returns null otherwise.
 * @param valueToDecode
 * @returns Buffer if valid. null otherwise
 */
const base58decode = (valueToDecode) => {
    try {
        return base58check.decode(valueToDecode);
    } catch (e) {
        return null;
    }
};

/**
 * Private and public keys prefixes.
 * @type {string}
 */
export const PRIVATE_KEY_PREFIX_FC = 'Fs';
export const PUBLIC_KEY_PREFIX_FC = 'FA';
export const PRIVATE_KEY_PREFIX_EC = 'Es';
export const PUBLIC_KEY_PREFIX_EC = 'EC';

/**
 * Returns true if the key param is a valid key.
 * @param key
 * @returns {boolean}
 */
export const isKey = (key = '') => Buffer.isBuffer(base58decode(key));

/**
 * Returns true if key is a private key.
 * @param key
 * @returns {boolean}
 */
export const isPrivateKey = (key = '') =>
    (key.startsWith(PRIVATE_KEY_PREFIX_EC) || key.startsWith(PRIVATE_KEY_PREFIX_FC)) && isKey(key);

/**
 * Returns true if key is not a valid key, but it looks like one.
 * @param key
 * @returns {boolean}
 */
export const isProbablyAKey = (key = '') =>
    key.length === 52 &&
    (key.startsWith(PUBLIC_KEY_PREFIX_FC) || key.startsWith(PUBLIC_KEY_PREFIX_EC))
    && !isKey(key);
