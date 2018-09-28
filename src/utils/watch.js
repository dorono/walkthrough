/**
 * watch allows to define a callback when objToWatch changes.
 * @param objToWatch
 * @param onChange
 * @returns {*}
 */
export const watch = (objToWatch, onChange) => {
    const handler = {
        set(target, prop, value) {
            onChange(prop, value, target[prop]);
            return Reflect.get(target, prop, value);
        },
    };
    return new Proxy(objToWatch, handler);
};
