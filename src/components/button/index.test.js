import React from 'react';
import {shallow, mount} from 'enzyme';
import Button from './index';

describe('Input Component', () => {
    const mockOnClick = jest.fn();
    it('should render without errors', () => {
        shallow(
            <Button
                onClick={() => null}
                title={'Test'}
            />,
        );
    });
    it('should render an button', () => {
        const wrapper = shallow(
            <Button
                onClick={() => null}
                title={'Test'}
            />,
        );
        const button = wrapper.find('button');
        expect(button.length).toBe(1);
    });
    it('should respond to onClick event', () => {
        const wrapper = mount((
            <Button
                onClick={mockOnClick}
                title={'Test'}
            />
        ));
        wrapper.find('button').simulate('click');
        expect(mockOnClick).toHaveBeenCalled();
    });
});
