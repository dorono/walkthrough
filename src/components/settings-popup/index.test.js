import React from 'react';
import {shallow} from 'enzyme';
import APIConfig from 'utils/api-config';
import {AVAILABLE_BLOCKCHAINS} from 'blockchains';
import SettingsPopup from './index';

describe('SettingsPopup Component', () => {
    const noOp = jest.fn();
    const apiConfig = new APIConfig();
    it('should render without errors', () => {
        shallow(
            <SettingsPopup
                show
                onClose={noOp}
                onSubmit={noOp}
                defaultApiConfig={apiConfig}
                apiConfig={apiConfig}
            />,
        );
    });
    it('should render the popup', () => {
        const wrapper = shallow((
            <SettingsPopup
                show
                defaultApiConfig={apiConfig}
                onClose={noOp}
                onSubmit={noOp}
                apiConfig={apiConfig}
            />
        ));
        const modalBody = wrapper.find('ModalBody');
        expect(modalBody.length).toBe(1);
    });
    it('should have a Form', () => {
        const wrapper = shallow((
            <SettingsPopup
                show={false}
                defaultApiConfig={apiConfig}
                onClose={noOp}
                onSubmit={noOp}
                apiConfig={apiConfig}
            />
        ));
        expect(wrapper.find('Form').length).toBe(1);
    });
    it('checkbox should be disabled and set to true after selecting something different to Public network', () => {
        const wrapper = shallow((
            <SettingsPopup
                show
                defaultApiConfig={apiConfig}
                onClose={noOp}
                onSubmit={noOp}
                apiConfig={apiConfig}
            />
        ));
        wrapper.instance().handleDropdownChange(AVAILABLE_BLOCKCHAINS.SHARED);
        expect(wrapper.state('enableCredentialsCheckbox')).toBe(false);
        expect(wrapper.state('useCredentials')).toBe(true);
    });
});
