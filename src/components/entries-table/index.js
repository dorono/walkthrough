import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {currentTimezone, formatDate} from 'utils/date';
import Table from 'components/table';
import Hash from 'components/hash';

export default class EntriesTable extends Component {
    static propTypes = {
        entries: PropTypes.arrayOf(PropTypes.shape({
            created_at: PropTypes.string.isRequired,
            hash: PropTypes.string.isRequired,
        })).isRequired,
    };

    render() {
        return (
            <Table
                columns={[`CREATED (${currentTimezone()})`, 'HASH']}
                rows={this.props.entries}
                ellipsis={1}
                type='secondary'>
                {row => (
                    <tr key={row.hash}>
                        <td>{formatDate(row.created_at)}</td>
                        <td><Hash type='entry'>{row.hash}</Hash></td>
                    </tr>
                )}
            </Table>
        );
    }
}