/**
 * User Agent related tools.
 */
import get from 'lodash/get';

/**
 * Get the current user agent.
 * @type {*}
 */
const currentUserAgent = get(window, 'navigator.userAgent', '');

/**
 * Verify if user agent is Internet Explorer.
 * @param userAgent
 * @returns {boolean}
 */
export const isIE = (userAgent = currentUserAgent) => userAgent.toLowerCase()
    .match(/(?:msie |trident.+?; rv:)(\d+)/) !== null;

/**
 * Verify if user agent is Edge.
 * @param userAgent
 * @returns {boolean}
 */
export const isEdge = (userAgent = currentUserAgent) => userAgent.toLowerCase()
    .match(/edge\/(\d+)/) !== null;
