import React from 'react';
import {shallow} from 'enzyme';
import APIConfig from 'api/api-config';
import {AVAILABLE_BLOCKCHAINS} from 'constants/blockchains';
import {ERRORS} from 'constants/errors';
import {trackNotSuccessfulConnection} from 'utils/analytics';
import SettingsPopup, {getDefaultErrors} from './index';

// Ask Jest to mock the analytics module.
jest.mock('../../utils/analytics');

const noOp = jest.fn();
const apiConfig = new APIConfig();
const defaultProps = {
    show: true,
    allowCustomCredentials: false,
    onClose: noOp,
    onSubmit: noOp,
    isConfiguredByDefault: noOp,
    defaultApiConfig: apiConfig,
    apiConfig,
    value: 'test',
};

describe('SettingsPopup Component', () => {
    it('should render without errors', () => {
        shallow(<SettingsPopup {...defaultProps} />);
    });

    it('should render the popup', () => {
        const wrapper = shallow(<SettingsPopup {...defaultProps} />);
        const modalBody = wrapper.find('ModalBody');
        expect(modalBody.length).toBe(1);
    });

    it('should have a Form', () => {
        const wrapper = shallow((
            <SettingsPopup
                {...defaultProps}
                show={false}
            />
        ));
        expect(wrapper.find('Form').length).toBe(1);
    });

    it('checkbox should be disabled and set to true after selecting something different to Public network', () => {
        const wrapper = shallow(<SettingsPopup {...defaultProps} />);
        wrapper.instance().handleDropdownChange(AVAILABLE_BLOCKCHAINS.SHARED);
        expect(wrapper.state('enableCredentialsCheckbox')).toBe(false);
        expect(wrapper.state('useCredentials')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('should track error type on api configuration validation', async () => {
        const settingsPopup = shallow(<SettingsPopup {...defaultProps} />);
        const p = Promise.resolve();
        settingsPopup.instance().handleSubmit();
        await p;
        expect(trackNotSuccessfulConnection).toHaveBeenCalledTimes(1);
        expect(trackNotSuccessfulConnection).toHaveBeenCalledWith(ERRORS.OTHER);
    });

    it('renderErrorMessage should return a valid error message', async () => {
        const settingsPopup = shallow(<SettingsPopup {...defaultProps} />);
        let errors = getDefaultErrors();

        errors[ERRORS.NETWORK] = true;
        settingsPopup.setState({errors});
        expect(settingsPopup.instance().renderErrorMessage().type.name)
            .toBe('NetworkErrorMessage');

        errors = getDefaultErrors();
        errors[ERRORS.CREDENTIALS] = true;
        settingsPopup.setState({errors});
        expect(settingsPopup.instance().renderErrorMessage().type.name)
            .toBe('CredentialsErrorMessage');

        errors = getDefaultErrors();
        errors[ERRORS.OTHER] = true;
        settingsPopup.setState({errors});
        expect(settingsPopup.instance().renderErrorMessage().type.name)
            .toBe('GenericErrorMessage');
    });

    it('should tell the user that custom credentials are not allowed', async () => {
        const settingsPopup = shallow(
            <SettingsPopup
                {...defaultProps}
                allowCustomCredentials={false}
            />,
        );
        expect(settingsPopup.instance().renderErrorMessage().type.name)
            .toBe('CustomCredentialsNotAllowedErrorMessage');
    });
});
