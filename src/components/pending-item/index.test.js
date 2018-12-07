import React from 'react';
import {shallow} from 'enzyme';
import {STAGE_PENDING} from 'stages';

import PendingItem from './index';

const defaultProps = {
    enableTooltip: true,
    stage: STAGE_PENDING,
};

describe('PendingItem Component', () => {
    it('should render without errors', () => {
        shallow(
            <PendingItem {...defaultProps} />,
        );
    });

    const wrapper = shallow(<PendingItem {...defaultProps} />);

    it('should display the tooltip on mouseover', () => {
        wrapper.instance().handleMouseEnter();
        expect(wrapper.state('displayTooltip')).toBe(true);
    });

    it('should hide the tooltip on mouseout', () => {
        wrapper.instance().handleMouseEnter();
        expect(wrapper.state('displayTooltip')).toBe(false);
    });

    it('should match snapshot', () => {
        expect(shallow(<PendingItem />)).toMatchSnapshot();
    });
});
