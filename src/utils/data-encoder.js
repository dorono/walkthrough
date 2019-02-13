import utf8 from 'utf8';
import {toHex} from 'utils/encoding';

/**
 * This wraps the execution of a encoding function in a try/catch to return null if encoding fails
 */
const handleEncodingErrors = encodingFunction => (...args) => {
    let result;
    try {
        result = encodingFunction(...args);
    } catch (e) {
        return undefined;
    }
    return result;
};

// Stringify to properly handle in view
const rawToJson = rawData => JSON.stringify(handleEncodingErrors(JSON.parse)(rawData));

const rawToHex = rawData => handleEncodingErrors(toHex)(rawData);

const isValidUTF8 = string => handleEncodingErrors(utf8.decode)(string) !== null;

/**
 * This function returns different encoding formats for a given data object.
 *
 * @param base64EncodedData The base64 data to encode
 * @returns {Object} An object where each key is encoding type and value the encoded data
 */
const getMultipleEncodings = base64EncodedData => {
    // Decode the data received in base64
    const rawData = window.atob(base64EncodedData);
    const rawDataIsValidUTF8 = isValidUTF8(rawData);

    return {
        raw: rawData,
        json: rawDataIsValidUTF8 ? rawToJson(rawData) : null,
        hex: rawDataIsValidUTF8 ? rawToHex(rawData) : null,
        base64: rawDataIsValidUTF8 ? base64EncodedData : null,
    };
};

export default getMultipleEncodings;
