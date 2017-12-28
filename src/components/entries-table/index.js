import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addPaginationParams} from 'api';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Sortable, {sortOptions} from 'components/sortable';
import Pagination from 'components/pagination';
import Table from 'components/table';

@load(({entriesUrl, pageParams}) => addPaginationParams(entriesUrl, pageParams))
export default class EntriesTable extends Component {
    static propTypes = {
        renderContent: PropTypes.func.isRequired,
        contentColumnName: PropTypes.string,
    };

    static defaultProps = {
        contentColumnName: 'HASH',
    };

    render() {
        return (
            <Sortable
                items={this.props.data}
                sortOptions={[
                    sortOptions.newestFirst,
                    sortOptions.oldestFirst,
                ]}>
                {(items, sortDropdown) => (
                    <Container title='Entries' count={this.props.count} actions={sortDropdown}>
                        <Table
                            columns={[`CREATED (${currentTimezone()})`, this.props.contentColumnName]}
                            rows={items}
                            ellipsis={1}
                            type='secondary'>
                            {row => (
                                <tr key={row.created_at}>
                                    <td>{formatDate(row.created_at)}</td>
                                    <td>{this.props.renderContent(row)}</td>
                                </tr>
                            )}
                        </Table>
                        {this.props.count > this.props.limit && (
                            <Pagination
                                count={this.props.count}
                                limit={this.props.limit}
                                offset={this.props.offset}
                            />
                        )}
                    </Container>
                )}
            </Sortable>
        );
    }
}
