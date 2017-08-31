import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Sortable, {sortOptions} from 'components/sortable';
import Table from 'components/table';
import Hash from 'components/hash';

export default class EntriesTable extends Component {
    static propTypes = {
        entries: PropTypes.arrayOf(PropTypes.shape({
            created_at: PropTypes.string.isRequired,
            hash: PropTypes.string.isRequired,
        })).isRequired,
        hashExtraArgs: PropTypes.object,
    };

    render() {
        return (
            <Sortable
                items={this.props.entries}
                sortOptions={[
                    sortOptions.newestFirst,
                    sortOptions.oldestFirst,
                ]}>
                {(items, sortDropdown) => (
                    <Container title='Entries' count={items.length} actions={sortDropdown}>
                        <Table
                            columns={[`CREATED (${currentTimezone()})`, 'HASH']}
                            rows={items}
                            ellipsis={1}
                            type='secondary'>
                            {row => (
                                <tr key={row.hash}>
                                    <td>{formatDate(row.created_at)}</td>
                                    <td><Hash type='entry' extraArgs={this.props.hashExtraArgs}>{row.hash}</Hash></td>
                                </tr>
                            )}
                        </Table>
                    </Container>
                )}
            </Sortable>
        );
    }
}
