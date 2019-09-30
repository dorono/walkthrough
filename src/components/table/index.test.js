import React from 'react';
import {shallow} from 'enzyme';
import {Table} from './index';

const defaultProps = {
    columns: [
        'col1',
        'col2',
        'col3_short|||col3_long',
    ],
    ellipsis: [1, 2],
    rows: [{
        field1: 'row1_test1',
        field2: 'row1_test2',
        field3: 'row1_test3',
    },
    {
        field1: 'row2_test1',
        field2: 'row2_test2',
        field3: 'row2_test3',
    }],
};

function createTableRows(rowVal, idx) {
    return (
        <tr key={idx}>
            <td>{rowVal.field1}</td>
            <td>{rowVal.field2}</td>
            <td>{rowVal.field3}</td>
        </tr>
    );
}

describe('Table', () => {
    it('should render without errors', () => {
        shallow(
            <Table {...defaultProps}>
                {(row, index) => createTableRows(row, index)}
            </Table>,
        );
    });

    it('should match snapshot with 2 cols set for ellipses', () => {
        expect(shallow(
            <Table {...defaultProps}>
                {(row, index) => createTableRows(row, index)}
            </Table>,
        )).toMatchSnapshot();
    });

    it('should match snapshot with 1 col set for ellipses', () => {
        defaultProps.ellipsis = 2;
        expect(shallow(
            <Table {...defaultProps}>
                {(row, index) => createTableRows(row, index)}
            </Table>,
        )).toMatchSnapshot();
    });
});
