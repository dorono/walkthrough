import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addPaginationParams} from 'api';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Pagination from 'components/pagination';
import Table from 'components/table';

@load(({entriesUrl, pageParams}) => addPaginationParams(entriesUrl, pageParams))
export default class EntriesTable extends Component {
    static propTypes = {
        renderContent: PropTypes.func.isRequired,
        contentColumnName: PropTypes.string,
        hasLink: PropTypes.bool,
    };

    static defaultProps = {
        contentColumnName: 'HASH',
        hasLink: true,
    };

    render() {
        return (
            <Container title='Entries' count={this.props.count}>
                <Table
                    columns={[`CREATED (${currentTimezone()})`, this.props.contentColumnName]}
                    rows={this.props.data}
                    ellipsis={1}
                    type='secondary'
                    interactive={this.props.hasLink}>
                    {(row, index) => (
                        <tr key={index}>
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
        );
    }
}
