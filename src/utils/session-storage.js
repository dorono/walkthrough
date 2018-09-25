/**
 * setSessionItem allows to save a value in the session storage.
 * @param key
 * @param value
 * @returns {*}
 */
export const setSessionItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};
/**
 * getSessionItem allows to obtain a value from the session.
 * @param key
 * @returns {*}
 */
export const getSessionItem = (key) => {
    try {
        return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
        return null;
    }
};
