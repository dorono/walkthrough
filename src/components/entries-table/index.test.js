import React from 'react';
import {shallow} from 'enzyme';
import {STAGE_PENDING, STAGE_CONFIRMED} from 'constants/stages';

import {EntriesTable} from './index';

const defaultProps = {
    contentColumnName: 'HASH',
    hasLink: true,
    data: [{
        stage: STAGE_CONFIRMED,
    }, {
        stage: STAGE_CONFIRMED,
    }],
    renderContent: jest.fn,
};

jest.mock('../../utils/date', () => {
    return {
        currentTimezone: () => '11/11/11',
        formatDateLong: () => '11111111',
    };
});

describe('Entries Table Component', () => {
    it('should render without errors', () => {
        shallow(<EntriesTable {...defaultProps} />);
    });

    it('should match snapshot', () => {
        expect(shallow(<EntriesTable {...defaultProps} />)).toMatchSnapshot();
    });

    it('should NOT display the <PendingLegend /> component if there are no pending entries', () => {
        const wrapper = shallow(<EntriesTable {...defaultProps} />);
        expect(wrapper.state('hasPendingEntries')).toBe(false);
        expect(shallow(<EntriesTable {...defaultProps} />)).toMatchSnapshot();
    });

    it(
        'should change the local state to display the <PendingLegend /> component if one or more entries are pending',
    () => {
        defaultProps.data = [{
            stage: STAGE_PENDING,
        }, {
            stage: STAGE_CONFIRMED,
        }];

        const wrapper = shallow(<EntriesTable {...defaultProps} />);
        expect(wrapper.state('hasPendingEntries')).toBe(true);
        expect(shallow(<EntriesTable {...defaultProps} />)).toMatchSnapshot();
    });
});
