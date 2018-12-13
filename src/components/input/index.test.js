import React from 'react';
import {shallow, mount} from 'enzyme';
import SettingsPopup from 'components/settings-popup';
import APIConfig from 'utils/api-config';
import Input from './index';

describe('Input Component', () => {
    const wrapperApiConfig = shallow(
        <SettingsPopup
            show={false}
            defaultApiConfig={new APIConfig()}
            apiConfig={new APIConfig()}
            onSubmit={jest.fn}
            onClose={jest.fn}
            isConfiguredByDefault={jest.fn}
        />);
    const handleChangeSpy = jest.spyOn(wrapperApiConfig.instance(), 'handleChange');
    it('should render without errors', () => {
        shallow(
            <Input
                id={'test'}
                name={'test'}
                type={'test'}
                value={''}
                handleChange={handleChangeSpy}
            />,
        );
    });
    it('should render an input', () => {
        const wrapper = shallow((
            <Input
                id={'test'}
                name={'test'}
                type={'test'}
                value={''}
                handleChange={handleChangeSpy}
            />
        ));
        const input = wrapper.find('input');
        expect(input.length).toBe(1);
    });
    it('should respond to handleChange event', () => {
        const event = {target: {name: 'test', value: 'spam'}};
        const wrapper = mount((
            <Input
                id={'test'}
                name={'test'}
                type={'test'}
                value={''}
                handleChange={handleChangeSpy}
            />
        ));
        wrapper.find('input').simulate('change', event);
        expect(handleChangeSpy).toHaveBeenCalled();
    });
});
