import React, {Component} from 'react';
import {load} from 'decorators';
import Container from 'components/container';
import Table from 'components/table';
import Pagination from 'components/pagination';
import Hash from 'components/hash';
import DateDisplay from 'components/date-display';

@load('/data/dblocks.json')
export default class DirectoryBlockList extends Component {
    render() {
        return (
            <Container primary title='Directory blocks'>
                <Table
                    columns={[
                        'HEIGHT',
                        'START TIME',
                        'KEYMR',
                        'ADMIN ENTRIES',
                        'EC ENTRIES',
                        'FACTOID ENTRIES',
                        'ENTRIES',
                    ]}
                    rows={this.props.data}
                    ellipsis={2}>
                    {row => (
                        <tr key={row.height}>
                            <td>{row.height}</td>
                            <td><DateDisplay>{row.started_at}</DateDisplay></td>
                            <td><Hash type='dblock'>{row.keymr}</Hash></td>
                            <td>{row.admin_entries}</td>
                            <td>{row.ec_entries}</td>
                            <td>{row.factoid_entries}</td>
                            <td>{row.entries}</td>
                        </tr>
                    )}
                </Table>
                <Pagination />
            </Container>
        );
    }
}
