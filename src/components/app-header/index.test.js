import React from 'react';
import {shallow} from 'enzyme';
import {request} from '../../api/index';
import AppHeader from './index';

const url = `${CONFIG.apiUrl}${CONFIG.apiUrlVersionSuffix}`;
const apiConfigInvalidCreds = {apiUrl: CONFIG.apiUrl};

const apiConfig = {
    blockchain: 'Public',
};

const defaultProps = {
    apiConfig,
    notifyRemoteConfigWasBlocked: false,
    defaultApiConfig: apiConfig,
    allowCustomCredentials: false,
    isConfiguredByDefault: jest.fn,
    remoteConfig: false,
    onSettingsSubmit: jest.fn,
};

const mockUnsuccessfulFetch = () => jest.fn().mockImplementation(() =>
        Promise.resolve({status: 403}));

describe('App Header Component', () => {
    it('should render without errors', () => {
        shallow(<AppHeader {...defaultProps} />);
    });

    it('should display the Settings Popup if notifyRemoteConfigWasBlocked is true', () => {
        const appHeader = shallow(<AppHeader {...defaultProps} notifyRemoteConfigWasBlocked />);
        expect(appHeader.find('SettingsPopup').length).toBe(1);
        expect(appHeader).toMatchSnapshot();
    });

    it('should display the Settings Popup if invalid credentials are detected', async () => {
        global.fetch = mockUnsuccessfulFetch();
        await expect(request(url, apiConfigInvalidCreds, null)).rejects.toThrow();
        const appHeader = shallow(<AppHeader {...defaultProps} notifyRemoteConfigWasBlocked />);
        expect(appHeader.find('SettingsPopup').length).toBe(1);
        expect(appHeader).toMatchSnapshot();
    });
});
