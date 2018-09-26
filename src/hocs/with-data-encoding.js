import React, {Component} from 'react';
import isPlainObject from 'lodash/isPlainObject';
import getEncodingOptions from 'utils/data-encoder';

/**
 * This HOC encodes the content of 'data' prop and returns an array of possible encodings for
 * the original data contained in the prop
 * @param excludedFormats An array of the encodings we want to exclude of the conversions
 * @returns {Component} - the wrapped component
 */
const withDataEncodings = ({formats = []} = {}) => WrappedComponent => {
    return class WrappedComponentWithEncodings extends Component {
        /**
         * Filters empty keys and returns an array of objects of shape
         * {label: encodingType, value: encodedValue}
         * @param data An object where keys are encodingTypes and values its corresponding encodings
         * @returns {{label: string, value: *}}
         */
        generateEncodingObjects(data) {
            return Object
                .keys(data)
                .filter(format => data[format] != null && (formats.length === 0 ? true : formats.includes(format)))
                .map(format => ({label: format, value: data[format]}));
        }

        render() {
            const {data, ...otherProps} = this.props;
            const dataEncodings = this.generateEncodingObjects(getEncodingOptions(data));
            return (
                <WrappedComponent data={dataEncodings} {...otherProps} />
            );
        }
    };
};

/**
 * Default export is a function that can receive a config object or a React Element
 * If it receives a config object, returns a configured HOC.
 * If it receives a React Element, returns that Element wrapped by the default HOC.
 */
export default receivedParam => isPlainObject(receivedParam)
    ? withDataEncodings(receivedParam)
    : withDataEncodings({})(receivedParam);

