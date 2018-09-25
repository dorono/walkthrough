import React from 'react';
import {shallow, mount} from 'enzyme';
import APIConfig from 'utils/api-config';
import {AVAILABLE_BLOCKCHAINS} from 'blockchains';
import SettingsPopup from './index';

describe('SettingsPopup Component', () => {
    const noOp = jest.fn();
    const apiConfig = new APIConfig();
    it('should render without errors', () => {
        shallow(
            <SettingsPopup show onClose={noOp} onSubmit={noOp} apiConfig={apiConfig} />,
        );
    });
    it('should render the popup', () => {
        const wrapper = shallow((
            <SettingsPopup
                show
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
                onClose={noOp}
                onSubmit={noOp}
                apiConfig={apiConfig}
            />
        ));
        expect(wrapper.find('Form').length).toBe(1);
    });
    it('checkbox should be disabled and set to true after selecting something different to Mainnet', () => {
        const wrapper = mount((
            <SettingsPopup
                show
                onClose={noOp}
                onSubmit={noOp}
                apiConfig={apiConfig}
            />
        ));
        wrapper.setState({selectedBlockchain: AVAILABLE_BLOCKCHAINS.SHARED});
        expect(wrapper.state('enableCredentialsCheckbox')).toBe(false);
        expect(wrapper.state('useCredentials')).toBe(true);
    });
});
