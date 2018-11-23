import React, {Component} from 'react';
import {dataLoader} from 'decorators';
import {addPaginationParams} from 'api';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Table from 'components/table';
import Pagination from 'components/pagination';
import Hash from 'components/hash';

@dataLoader(({location}) => addPaginationParams('/dblocks', location.search))
export default class DirectoryBlockList extends Component {
    render() {
        const adminEntries = this.props.data.map(row => row.admin_entries).filter(value => value !== null);
        const ecEntries = this.props.data.map(row => row.ec_entries).filter(value => value !== null);

        const columns = [
            'HEIGHT',
            `START TIME (${currentTimezone()})`,
            'KEYMR',
            adminEntries.length > 0 ? 'ADMIN ENTRIES' : false,
            ecEntries.length > 0 ? 'EC ENTRIES' : false,
            'FACTOID ENTRIES',
            'ENTRIES',
        ].filter(Boolean);

        return (
            <Container primary title='Directory blocks'>
                <Table
                    columns={columns}
                    rows={this.props.data}
                    ellipsis={2}
                    centerAlign={3}
                    fixedWidth={{start: 3, width: 130}}
                    responsive>
                    {row => (
                        <tr key={row.height}>
                            <td>{row.height}</td>
                            <td>{formatDate(row.started_at)}</td>
                            <td><Hash type='dblock'>{row.keymr}</Hash></td>
                            {adminEntries.length > 0 && <td>{row.admin_entries}</td>}
                            {ecEntries.length > 0 && <td>{row.ec_entries}</td>}
                            <td>{row.factoid_entries}</td>
                            <td>{row.entries}</td>
                        </tr>
                    )}
                </Table>
                <Pagination count={this.props.count} limit={this.props.limit} offset={this.props.offset} />
            </Container>
        );
    }
}
