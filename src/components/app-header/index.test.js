import React from 'react';
import {shallow} from 'enzyme';
import AppHeader from './index';

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

describe('App Header Component', () => {
    it('should render without errors', () => {
        shallow(<AppHeader {...defaultProps} />);
    });

    it('should display the Settings Popup if notifyRemoteConfigWasBlocked is true', () => {
        const appHeader = shallow(<AppHeader {...defaultProps} notifyRemoteConfigWasBlocked />);
        expect(appHeader.find('SettingsPopup').length).toBe(1);
        expect(appHeader).toMatchSnapshot();
    });
});
